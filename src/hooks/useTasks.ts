'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Task, TaskStatus } from '@/types';
import { generateId } from '@/lib/utils';

export function useTasks() {
  const [tasks, setTasks, isHydrated] = useLocalStorage<Task[]>('pm-tasks', []);

  const addTask = useCallback(
    (title: string, status: TaskStatus = 'todo') => {
      const tasksInColumn = tasks.filter((t) => t.status === status);
      const newTask: Task = {
        id: generateId(),
        title,
        status,
        createdAt: new Date().toISOString(),
        order: tasksInColumn.length,
      };
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    },
    [tasks, setTasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const moveTask = useCallback(
    (taskId: string, toStatus: TaskStatus, toIndex: number) => {
      setTasks((prev) => {
        const taskIndex = prev.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return prev;

        const task = prev[taskIndex];
        const updated = prev.filter((t) => t.id !== taskId);

        const movedTask: Task = {
          ...task,
          status: toStatus,
        };

        const destTasks = updated.filter((t) => t.status === toStatus);
        destTasks.splice(toIndex, 0, movedTask);

        const reorderedDestTasks = destTasks.map((t, i) => ({
          ...t,
          order: i,
        }));
        const otherTasks = updated.filter((t) => t.status !== toStatus);

        return [...otherTasks, ...reorderedDestTasks];
      });
    },
    [setTasks]
  );

  const reorderTasks = useCallback(
    (status: TaskStatus, activeId: string, overId: string) => {
      setTasks((prev) => {
        const columnTasks = prev
          .filter((t) => t.status === status)
          .sort((a, b) => a.order - b.order);
        const otherTasks = prev.filter((t) => t.status !== status);

        const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
        const newIndex = columnTasks.findIndex((t) => t.id === overId);

        if (oldIndex === -1 || newIndex === -1) return prev;

        const reordered = [...columnTasks];
        const [removed] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, removed);

        const reorderedWithOrder = reordered.map((t, i) => ({
          ...t,
          order: i,
        }));

        return [...otherTasks, ...reorderedWithOrder];
      });
    },
    [setTasks]
  );

  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      'in-progress': [],
      complete: [],
    };

    tasks.forEach((task) => {
      grouped[task.status].push(task);
    });

    Object.keys(grouped).forEach((status) => {
      grouped[status as TaskStatus].sort((a, b) => a.order - b.order);
    });

    return grouped;
  }, [tasks]);

  return {
    tasks,
    tasksByStatus,
    isHydrated,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks,
  };
}
