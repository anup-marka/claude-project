'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

interface NoteEditorProps {
  note: Note;
  onUpdate: (id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => void;
}

export function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const debouncedTitle = useDebounce(title, 500);
  const debouncedContent = useDebounce(content, 500);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id, note.title, note.content]);

  useEffect(() => {
    if (debouncedTitle !== note.title) {
      onUpdate(note.id, { title: debouncedTitle });
    }
  }, [debouncedTitle, note.id, note.title, onUpdate]);

  useEffect(() => {
    if (debouncedContent !== note.content) {
      onUpdate(note.id, { content: debouncedContent });
    }
  }, [debouncedContent, note.id, note.content, onUpdate]);

  return (
    <div className="flex flex-col h-full">
      {/* Title input */}
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className={cn(
            'w-full px-5 py-4 text-lg font-display font-semibold',
            'bg-transparent text-text-bright placeholder:text-text-muted',
            'border-b border-border-subtle/50',
            'focus:outline-none',
            'transition-all duration-200'
          )}
        />
        {/* Focus line */}
        <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-neon-purple/50 via-neon-cyan/50 to-transparent opacity-0 focus-within:opacity-100 transition-opacity" />
      </div>

      {/* Content textarea */}
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className={cn(
            'w-full h-full p-5 text-sm leading-relaxed resize-none font-body',
            'bg-transparent text-text-primary placeholder:text-text-muted/60',
            'focus:outline-none'
          )}
        />

        {/* Character count */}
        <div className="absolute bottom-3 right-4 text-xs text-text-muted/50 font-body">
          {content.length} chars
        </div>
      </div>
    </div>
  );
}
