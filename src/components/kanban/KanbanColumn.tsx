'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types';
import { cn } from '@/lib/utils';
import { KanbanCard } from './KanbanCard';
import { AddTaskForm } from './AddTaskForm';

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask: (title: string, status: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
}

const statusConfig: Record<TaskStatus, { color: string; icon: string; gradient: string }> = {
  'todo': {
    color: 'neon-cyan',
    icon: '◯',
    gradient: 'from-neon-cyan/20 to-transparent',
  },
  'in-progress': {
    color: 'neon-orange',
    icon: '◐',
    gradient: 'from-neon-orange/20 to-transparent',
  },
  'complete': {
    color: 'neon-purple',
    icon: '●',
    gradient: 'from-neon-purple/20 to-transparent',
  },
};

export function KanbanColumn({
  id,
  title,
  tasks,
  onAddTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const config = statusConfig[id];

  return (
    <div
      className={cn(
        'flex-1 min-w-[300px] max-w-[380px]',
        'rounded-xl relative',
        'flex flex-col',
        'transition-all duration-300'
      )}
    >
      {/* Background with gradient */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl',
          'bg-bg-surface/80 backdrop-blur-sm',
          'border border-border-subtle',
          isOver && 'border-neon-cyan/40'
        )}
      />

      {/* Top accent gradient */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-24 rounded-t-xl',
          `bg-gradient-to-b ${config.gradient}`,
          'pointer-events-none'
        )}
      />

      {/* Header */}
      <div className="relative p-4 border-b border-border-subtle/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="relative">
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  `bg-${config.color}/10`
                )}
              >
                <span className={`text-${config.color} text-sm`}>{config.icon}</span>
              </div>
              <div
                className={cn(
                  'absolute inset-0 rounded-lg blur-md -z-10',
                  `bg-${config.color}/20`
                )}
              />
            </div>
            <h3 className="font-display font-bold text-text-bright tracking-wide text-sm uppercase">
              {title}
            </h3>
          </div>
          <div
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-body font-medium',
              `bg-${config.color}/10 text-${config.color}`
            )}
          >
            {tasks.length}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div
        ref={setNodeRef}
        className={cn(
          'relative flex-1 p-3 space-y-3 overflow-y-auto min-h-[250px]',
          'transition-colors duration-200',
          isOver && 'bg-neon-cyan/5'
        )}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <KanbanCard task={task} onDelete={onDeleteTask} status={id} />
            </div>
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="h-28 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-lg bg-bg-elevated/50 flex items-center justify-center mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-text-muted"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm text-text-muted font-body">No tasks</p>
          </div>
        )}
      </div>

      {/* Add task form */}
      <div className="relative p-3 border-t border-border-subtle/50">
        <AddTaskForm onAdd={(title) => onAddTask(title, id)} status={id} />
      </div>
    </div>
  );
}
