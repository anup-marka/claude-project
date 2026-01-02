'use client';

import { useNotes } from '@/hooks/useNotes';
import { NoteCard } from './NoteCard';
import { NoteEditor } from './NoteEditor';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function NotesArea() {
  const {
    notes,
    activeNote,
    activeNoteId,
    isHydrated,
    addNote,
    updateNote,
    deleteNote,
    selectNote,
  } = useNotes();

  if (!isHydrated) {
    return (
      <div className="h-80 rounded-xl skeleton" />
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl relative overflow-hidden',
        'flex h-80',
        'opacity-0 animate-fade-in-up',
        'stagger-3'
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-xl" />

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-purple/10 to-transparent rounded-tr-xl pointer-events-none" />

      {/* Notes list */}
      <div className="relative w-64 flex-shrink-0 border-r border-border-subtle/50 flex flex-col">
        <div className="p-4 border-b border-border-subtle/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-neon-purple/10 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-neon-purple"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="14,2 14,8 20,8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-lg bg-neon-purple/20 blur-md -z-10" />
            </div>
            <h3 className="font-display font-bold text-text-bright tracking-wide text-sm uppercase">
              Notes
            </h3>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={addNote}
            className="hover:bg-neon-purple/10 hover:text-neon-purple"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-10 h-10 rounded-lg bg-bg-elevated/50 flex items-center justify-center mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-text-muted"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-xs text-text-muted font-body">No notes yet</p>
            </div>
          ) : (
            notes.map((note, index) => (
              <div
                key={note.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <NoteCard
                  note={note}
                  isActive={note.id === activeNoteId}
                  onSelect={() => selectNote(note.id)}
                  onDelete={() => deleteNote(note.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="relative flex-1 flex flex-col">
        {activeNote ? (
          <NoteEditor note={activeNote} onUpdate={updateNote} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-bg-elevated/50 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-text-muted"
                >
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-sm text-text-muted font-body mb-1">
                {notes.length === 0
                  ? 'Create a note to get started'
                  : 'Select a note to edit'}
              </p>
              {notes.length === 0 && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={addNote}
                  className="mt-3 hover:border-neon-purple/50"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  New Note
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
