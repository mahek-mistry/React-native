import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  NoteMedia,
  NoteLink,
} from '../types';

export type Note = {
  id: string;
  title: string;
  content: string;

  images: NoteMedia[];
  videos: NoteMedia[];

  links: NoteLink[];

  isFavorite: boolean;

  createdAt: string;
  updatedAt: string;
};

type NotesState = {
  notes: Note[];
};

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',

  initialState,

  reducers: {
    addNote: (
      state,
      action: PayloadAction<Note>,
    ) => {
      state.notes.push(
        action.payload,
      );
    },

    updateNote: (
      state,
      action: PayloadAction<Note>,
    ) => {
      const index =
        state.notes.findIndex(
          note =>
            note.id ===
            action.payload.id,
        );

      if (index !== -1) {
        state.notes[index] =
          action.payload;
      }
    },

    deleteNote: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.notes =
        state.notes.filter(
          note =>
            note.id !==
            action.payload,
        );
    },

    toggleFavorite: (
      state,
      action: PayloadAction<string>,
    ) => {
      const note =
        state.notes.find(
          item =>
            item.id ===
            action.payload,
        );

      if (note) {
        note.isFavorite =
          !note.isFavorite;
      }
    },

    clearNotes: state => {
      state.notes = [];
    },

    setNotes: (
      state,
      action: PayloadAction<Note[]>,
    ) => {
      state.notes =
        action.payload;
    },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  toggleFavorite,
  clearNotes,
  setNotes,
} = notesSlice.actions;

export default notesSlice.reducer;