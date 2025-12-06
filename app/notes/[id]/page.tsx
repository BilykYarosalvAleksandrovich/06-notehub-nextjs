import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getNoteById } from "@/lib/api"; // ✅ Використовуємо getNoteById
import { Note } from "@/types/note";
import NoteDetailsClient from "./NoteDetails.client";

// Цей компонент виконується на сервері
export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const noteId = params.id;

  try {
    // PREFETCH: Попередньо завантажуємо дані однієї нотатки
    // Якщо нотатка не знайдена, це кине помилку, яку ми зловимо
    await queryClient.prefetchQuery<Note>({
      queryKey: ["note", noteId],
      queryFn: () => getNoteById(noteId),
    });
  } catch (error) {
    // В ідеалі тут має бути логіка обробки помилки/notFound
    // Для простоти поки припускаємо, що prefetchQuery обробить відсутність нотатки
    console.error(`Error prefetching note ${noteId}:`, error);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    // ГІДРАТАЦІЯ: Передаємо кеш даних клієнту
    // ✅ Змінено назву пропсу на 'id' відповідно до NoteDetailsClientProps
    <NoteDetailsClient dehydratedState={dehydratedState} id={noteId} />
  );
}
