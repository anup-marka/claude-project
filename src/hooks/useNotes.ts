'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Note } from '@/types';
import { generateId } from '@/lib/utils';

export function useNotes() {
  const [notes, setNotes, isHydrated] = useLocalStorage<Note[]>('pm-notes', []);
  const [activeNoteId, setActiveNoteId] = useLocalStorage<string | null>(
    'pm-active-note',
    null
  );

  const activeNote = notes.find((n) => n.id === activeNoteId) || null;

  const addNote = useCallback(() => {
    const newNote: Note = {
      id: generateId(),
      title: 'Untitled',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    return newNote;
  }, [setNotes, setActiveNoteId]);

  const updateNote = useCallback(
    (id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? { ...note, ...updates, updatedAt: new Date().toISOString() }
            : note
        )
      );
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      if (activeNoteId === id) {
        setActiveNoteId(null);
      }
    },
    [setNotes, activeNoteId, setActiveNoteId]
  );

  const selectNote = useCallback(
    (id: string | null) => {
      setActiveNoteId(id);
    },
    [setActiveNoteId]
  );

  return {
    notes,
    activeNote,
    activeNoteId,
    isHydrated,
    addNote,
    updateNote,
    deleteNote,
    selectNote,
  };
}
