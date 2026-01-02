'use client';

import { Todo } from '@/types';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/IconButton';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-3 rounded-lg',
        'transition-all duration-200',
        'hover:bg-bg-elevated/60',
        todo.completed && 'opacity-60'
      )}
    >
      {/* Custom checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          'w-5 h-5 rounded-md flex-shrink-0 relative',
          'flex items-center justify-center',
          'transition-all duration-300',
          'border-2',
          todo.completed
            ? 'bg-neon-cyan border-neon-cyan'
            : 'border-border-default hover:border-neon-cyan/60 hover:bg-neon-cyan/5'
        )}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            className="text-bg-void"
          >
            <polyline
              points="20 6 9 17 4 12"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {/* Glow effect on completed */}
        {todo.completed && (
          <div className="absolute inset-0 rounded-md bg-neon-cyan/30 blur-md -z-10" />
        )}
      </button>

      {/* Text */}
      <span
        className={cn(
          'flex-1 text-sm font-body leading-relaxed',
          'transition-all duration-200',
          todo.completed
            ? 'text-text-muted line-through decoration-text-muted/40'
            : 'text-text-primary'
        )}
      >
        {todo.text}
      </span>

      {/* Delete button */}
      <IconButton
        size="sm"
        onClick={() => onDelete(todo.id)}
        className={cn(
          'opacity-0 group-hover:opacity-100',
          'hover:text-neon-pink hover:bg-neon-pink/10'
        )}
        aria-label="Delete todo"
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
  );
}
