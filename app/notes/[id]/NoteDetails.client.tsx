"use client";

import { useQuery, HydrationBoundary } from "@tanstack/react-query";
import { DehydratedState } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string;
  dehydratedState: DehydratedState | null;
}

export default function NoteDetailsClient({
  id,
  dehydratedState,
}: NoteDetailsClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false, // ← ОБОВ'ЯЗКОВО
  });

  if (isLoading) {
    return (
      <div className={css.container}>
        <p>Loading note details...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={css.container}>
        <p>Note not found or an error occurred.</p>
      </div>
    );
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={css.container}>
        <div className={css.item}>
          <header className={css.header}>
            <h2>{data.title}</h2>
          </header>

          <div className={css.content}>{data.content}</div>

          <p className={css.date}>
            Created: {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </HydrationBoundary>
  );
}
