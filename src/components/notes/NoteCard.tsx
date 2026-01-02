'use client';

import { Note } from '@/types';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { IconButton } from '@/components/ui/IconButton';

interface NoteCardProps {
  note: Note;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function NoteCard({ note, isActive, onSelect, onDelete }: NoteCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group p-3 rounded-lg cursor-pointer relative',
        'transition-all duration-200'
      )}
    >
      {/* Background */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg transition-all duration-200',
          isActive
            ? 'bg-neon-purple/10 border border-neon-purple/40'
            : 'bg-bg-elevated/40 border border-transparent hover:bg-bg-elevated/60 hover:border-border-subtle'
        )}
      />

      {/* Active glow */}
      {isActive && (
        <div className="absolute inset-0 rounded-lg bg-neon-purple/10 blur-lg -z-10" />
      )}

      {/* Content */}
      <div className="relative flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              'text-sm font-medium font-body truncate transition-colors',
              isActive ? 'text-text-bright' : 'text-text-primary'
            )}
          >
            {note.title || 'Untitled'}
          </h4>
          <p className="text-xs text-text-muted mt-1 line-clamp-2 font-body">
            {note.content || 'Empty note'}
          </p>
          <p className="text-xs text-text-muted/60 mt-2 font-body">
            {formatDate(note.updatedAt)}
          </p>
        </div>

        <IconButton
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={cn(
            'opacity-0 group-hover:opacity-100 flex-shrink-0',
            'hover:text-neon-pink hover:bg-neon-pink/10'
          )}
          aria-label="Delete note"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
