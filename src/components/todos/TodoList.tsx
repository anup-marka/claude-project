'use client';

import { useState, FormEvent } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { TodoItem } from './TodoItem';
import { cn } from '@/lib/utils';

export function TodoList() {
  const { todos, isHydrated, addTodo, toggleTodo, deleteTodo, clearCompleted } =
    useTodos();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  if (!isHydrated) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-12 rounded-lg skeleton"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          {/* Glowing icon */}
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-neon-cyan"
              >
                <path
                  d="M9 11L12 14L22 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-lg bg-neon-cyan/20 blur-md -z-10" />
          </div>
          <div>
            <h2 className="font-display font-bold text-text-bright tracking-wide text-sm uppercase">
              Quick Tasks
            </h2>
            <p className="text-xs text-text-muted mt-0.5 font-body">
              {activeTodos.length} remaining
            </p>
          </div>
        </div>
      </div>

      {/* Add todo form */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative group">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a quick task..."
            className={cn(
              'w-full h-11 px-4 text-sm rounded-lg font-body',
              'bg-bg-elevated/80 text-text-primary placeholder:text-text-muted',
              'border border-border-subtle',
              'focus:outline-none focus:border-neon-cyan/50',
              'transition-all duration-300',
              'group-hover:border-border-default'
            )}
          />
          <div
            className={cn(
              'absolute inset-0 rounded-lg opacity-0 -z-10',
              'bg-neon-cyan/5 blur-xl',
              'transition-opacity duration-300',
              'group-focus-within:opacity-100'
            )}
          />
        </div>
      </form>

      {/* Todo list */}
      <div className="flex-1 overflow-y-auto px-3">
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 opacity-0 animate-fade-in">
            <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-text-muted"
              >
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="text-sm text-text-muted font-body">No tasks yet</p>
            <p className="text-xs text-text-muted/60 mt-1">Type above to add one</p>
          </div>
        ) : (
          <div className="space-y-1">
            {activeTodos.map((todo, index) => (
              <div
                key={todo.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TodoItem
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </div>
            ))}

            {completedTodos.length > 0 && (
              <>
                <div className="pt-4 pb-2 px-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-4 bg-border-subtle" />
                    <span className="text-xs text-text-muted font-body uppercase tracking-wider">
                      Done ({completedTodos.length})
                    </span>
                    <div className="h-px flex-1 bg-border-subtle" />
                  </div>
                  <button
                    onClick={clearCompleted}
                    className={cn(
                      'text-xs text-text-muted font-body px-2 py-1 rounded',
                      'hover:text-neon-pink hover:bg-neon-pink/10',
                      'transition-colors duration-200'
                    )}
                  >
                    Clear
                  </button>
                </div>
                {completedTodos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${(activeTodos.length + index) * 0.03}s` }}
                  >
                    <TodoItem
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer stats */}
      {todos.length > 0 && (
        <div className="p-4 border-t border-border-subtle">
          <div className="flex items-center justify-between text-xs text-text-muted font-body">
            <span>{activeTodos.length} active</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
              <span className="text-neon-cyan/80">
                {Math.round((completedTodos.length / todos.length) * 100)}% done
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1 bg-bg-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-500"
              style={{ width: `${(completedTodos.length / todos.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
