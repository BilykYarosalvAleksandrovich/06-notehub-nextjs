import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { PER_PAGE } from "@/config"; // Перенесіть конфігурацію сторінки (наприклад, 8)
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // ⬅️ PREFETCH: Попередньо завантажуємо першу сторінку нотаток на сервері
  // Якщо токен недійсний, тут виникне помилка, яку вловить error.tsx
  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: "" }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // ⬅️ ГІДРАТАЦІЯ: Передаємо кеш даних клієнту
    <NotesClient dehydratedState={dehydratedState} />
  );
}
