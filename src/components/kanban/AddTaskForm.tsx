'use client';

import { useState, FormEvent } from 'react';
import { TaskStatus } from '@/types';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
  status?: TaskStatus;
}

const statusColors: Record<TaskStatus, string> = {
  'todo': 'neon-cyan',
  'in-progress': 'neon-orange',
  'complete': 'neon-purple',
};

export function AddTaskForm({ onAdd, status = 'todo' }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const accentColor = statusColors[status];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="+ Add a task..."
        className={cn(
          'w-full h-10 px-4 text-sm rounded-lg font-body',
          'bg-bg-elevated/50 text-text-primary placeholder:text-text-muted',
          'border border-transparent',
          'focus:outline-none',
          'transition-all duration-300',
          isFocused && `border-${accentColor}/30 bg-bg-elevated/80`
        )}
      />

      {/* Focus glow effect */}
      {isFocused && (
        <div
          className={cn(
            'absolute inset-0 rounded-lg -z-10',
            `bg-${accentColor}/5 blur-xl`
          )}
        />
      )}
    </form>
  );
}
