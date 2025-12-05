"use client";

import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/lib/api"; // ✅ Оновлений шлях до API
import { HydrationBoundary } from "@/components/TanStackProvider/TanStackProvider"; // ✅ Нова назва
import { notFound } from "next/navigation";

import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string;
  dehydratedState: unknown;
}

export default function NoteDetailsClient({
  id,
  dehydratedState,
}: NoteDetailsClientProps) {
  // Використовуємо useQuery для отримання даних.
  // Якщо дані вже є у dehydratedState, useQuery одразу їх використовує (гідратація).
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
    // Якщо нотатки немає (повернено null), useQuery кине помилку
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={css.container}>
        <p>Loading note details...</p>
      </div>
    );
  }

  // Якщо isError true або data === null (через notFound, оброблене в SSR,
  // або помилку API), перенаправляємо на 404
  if (isError || !data) {
    // В ідеалі: notFound() тут не спрацює на клієнті, краще використовувати
    // просту заглушку помилки або редірект.
    // На рівні SSR ми обробляємо 404
    return (
      <div className={css.container}>
        <p>Note not found or an error occurred.</p>
      </div>
    );
  }

  // Якщо дані є, відображаємо їх
  const note = data;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={css.container}>
        <div className={css.item}>
          <header className={css.header}>
            <h2>{note.title}</h2>
          </header>
          <div className={css.content}>{note.content}</div>
          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </HydrationBoundary>
  );
}
