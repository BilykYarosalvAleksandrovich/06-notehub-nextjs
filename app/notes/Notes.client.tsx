"use client"; // ⬅️ Обов'язково для клієнтських компонентів

import { useState } from "react";
// DehydratedState не потрібен тут, оскільки ми використовуємо unknown/any для типу
import { useQuery } from "@tanstack/react-query";
import { HydrationBoundary } from "@/components/TanStackProvider/TanStackProvider"; // ✅ Нова назва
import { useDebounce } from "use-debounce";

import { fetchNotes, FetchNotesResponse } from "@/lib/api"; // ✅ Оновлений шлях
import { PER_PAGE } from "@/config"; // ✅ Оновлений шлях

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { DehydratedState } from "@tanstack/react-query";

import css from "./Notes.module.css";

export default function NotesClient({
  dehydratedState,
}: {
  dehydratedState: DehydratedState | null;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useDebounce гарантує, що запит спрацює лише після паузи у 500мс
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1); // При новому пошуку завжди повертаємось на першу сторінку
  };

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>(
    {
      queryKey: ["notes", page, debouncedSearch],
      queryFn: () =>
        fetchNotes({
          page,
          perPage: PER_PAGE,
          search: debouncedSearch,
        }),
      // placeholderData дозволяє уникнути стану "loading" при переході між сторінками
      placeholderData: (previousData) => previousData,
      // Дегідратація та гідратація дозволяють отримати дані з SSR/prefetch
    }
  );

  return (
    // ⬅️ ГІДРАТАЦІЯ: Обгортаємо компонент, щоб React Query відновив кеш
    <HydrationBoundary state={dehydratedState}>
      <div className={css.container}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={handleSearchChange} />

          {data && data.totalPages > 1 && (
            <Pagination
              current={page}
              totalPages={data.totalPages ?? 1}
              onPageChange={(p) => setPage(p)}
            />
          )}

          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>

        <main>
          {isLoading && !data && <p>Loading notes...</p>}
          {isFetching && !isLoading && <p>Updating results...</p>}
          {/* Показуємо "Updating" під час фонової перезавантаження */}
          {isError && <p>Something went wrong loading notes.</p>}

          {data?.notes && data.notes.length > 0 ? (
            <NoteList notes={data.notes} />
          ) : (
            !isLoading && !isError && <p>No notes found</p>
          )}
        </main>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm
              onClose={() => setIsModalOpen(false)}
              onNoteCreated={() => {
                setSearch("");
                setPage(1);
                setIsModalOpen(false); // Закриваємо модальне вікно після створення
              }}
            />
          </Modal>
        )}
      </div>
    </HydrationBoundary>
  );
}
