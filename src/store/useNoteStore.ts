import { create } from "zustand";

type NoteT = {
  id: number;
  text: string;
  createdAt: Date;
  deadline: Date;
};

type NoteStateT = {
  notes: NoteT[];
  addNote: (text: string, deadline: Date) => void;
  editNote: (id: number, text: string, deadline: Date) => void;
  deleteNote: (id: number) => void;
  moveNote: (id: number, newIndex: number) => void;
};

export const useNoteStore = create<NoteStateT>((set) => ({
  notes: [],
  addNote: (text, deadline) => {
    set((state) => ({
      notes: [
        ...state.notes,
        { id: Date.now(), text, createdAt: new Date(), deadline },
      ],
    }));
  },
  editNote: (id, text, deadline) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, text, deadline } : note
      ),
    }));
  },
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },
  moveNote: (id, newIndex) => {
    set((state) => {
      const notes = [...state.notes];
      const currentIndex = notes.findIndex((note) => note.id === id);
      const [movedNote] = notes.splice(currentIndex, 1);
      notes.splice(newIndex, 0, movedNote);
      return { notes };
    });
  },
}));
