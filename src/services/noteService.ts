import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  perPage: number;
  totalItems: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { data } = await noteHubApi.get<FetchNotesResponse>('/notes', {
    params,
  });

  return data;
};

export const createNote = async (
  newNote: CreateNotePayload,
): Promise<Note> => {
  const { data } = await noteHubApi.post<Note>('/notes', newNote);

  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await noteHubApi.delete<Note>(`/notes/${noteId}`);

  return data;
};
