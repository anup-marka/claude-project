'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, TaskStatus } from '@/types';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/IconButton';

interface KanbanCardProps {
  task: Task;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  status?: TaskStatus;
}

const statusColors: Record<TaskStatus, string> = {
  'todo': 'neon-cyan',
  'in-progress': 'neon-orange',
  'complete': 'neon-purple',
};

export function KanbanCard({ task, onDelete, isDragging, status = 'todo' }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragging = isDragging || isSortableDragging;
  const accentColor = statusColors[status];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative',
        'rounded-lg p-4',
        'cursor-grab active:cursor-grabbing',
        'transition-all duration-200',
        dragging && 'opacity-60 scale-105 rotate-2'
      )}
      {...attributes}
      {...listeners}
    >
      {/* Card background */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg',
          'bg-bg-elevated/90 backdrop-blur-sm',
          'border border-border-subtle',
          'transition-all duration-200',
          'group-hover:border-border-default',
          dragging && `border-${accentColor}/50 shadow-lg`
        )}
      />

      {/* Left accent bar */}
      <div
        className={cn(
          'absolute left-0 top-3 bottom-3 w-0.5 rounded-full',
          `bg-${accentColor}`,
          'opacity-60 group-hover:opacity-100',
          'transition-opacity duration-200'
        )}
      />

      {/* Content */}
      <div className="relative">
        <p className="text-sm text-text-primary font-body leading-relaxed pr-8">
          {task.title}
        </p>

        {/* Timestamp */}
        <p className="text-xs text-text-muted/70 mt-2 font-body">
          {new Date(task.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Delete button */}
      <IconButton
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className={cn(
          'absolute top-3 right-3',
          'opacity-0 group-hover:opacity-100',
          'hover:text-neon-pink hover:bg-neon-pink/10'
        )}
        aria-label="Delete task"
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </IconButton>
    </div>
  );
}
