import axios, { isAxiosError } from "axios";
import type { Note, NoteTag } from "@/types/note";

// Отримуємо токен
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// Перевірка на відсутність токена
if (!token) {
  console.error(
    "NEXT_PUBLIC_NOTEHUB_TOKEN is missing. Please check your .env file and restart the server."
  );
  throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is missing");
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

// ⬅️ ВИПРАВЛЕНО: Відповідність структурі API (notes та totalPages)
export interface FetchNotesResponse {
  notes: Note[]; // Змінено з results
  totalPages: number; // Залишено
  // totalResults та page видалено згідно з вимогами перевірки
}

export interface CreateNoteDto {
  title: string;
  content?: string;
  tag: NoteTag;
}

// === ФУНКЦІЇ СЕРВІСУ ===

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  try {
    const res = await api.get<FetchNotesResponse>("/notes", { params });
    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error(
        "401 Unauthorized: Failed to fetch notes. Please check token."
      );
    }
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (dto: CreateNoteDto): Promise<Note> => {
  try {
    const res = await api.post<Note>("/notes", dto);
    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error(
        "401 Unauthorized: Failed to create note. Please check token."
      );
    }
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const res = await api.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error(
        "401 Unauthorized: Failed to delete note. Please check token."
      );
    }
    throw error;
  }
};
