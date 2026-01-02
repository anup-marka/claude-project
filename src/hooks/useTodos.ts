'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Todo } from '@/types';
import { generateId } from '@/lib/utils';

export function useTodos() {
  const [todos, setTodos, isHydrated] = useLocalStorage<Todo[]>('pm-todos', []);

  const addTodo = useCallback(
    (text: string) => {
      const newTodo: Todo = {
        id: generateId(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        order: todos.length,
      };
      setTodos((prev) => [...prev, newTodo]);
      return newTodo;
    },
    [todos.length, setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    (id: string, text: string) => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  return {
    todos,
    isHydrated,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  };
}
