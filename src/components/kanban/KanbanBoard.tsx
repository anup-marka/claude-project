'use client';

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Task, TaskStatus, COLUMNS } from '@/types';
import { useTasks } from '@/hooks/useTasks';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

export function KanbanBoard() {
  const {
    tasksByStatus,
    isHydrated,
    addTask,
    deleteTask,
    moveTask,
    reorderTasks,
  } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findTask = (id: string): Task | undefined => {
    for (const status of Object.keys(tasksByStatus) as TaskStatus[]) {
      const task = tasksByStatus[status].find((t) => t.id === id);
      if (task) return task;
    }
    return undefined;
  };

  const findContainer = (id: string): TaskStatus | undefined => {
    if (id in tasksByStatus) return id as TaskStatus;

    for (const status of Object.keys(tasksByStatus) as TaskStatus[]) {
      if (tasksByStatus[status].some((t) => t.id === id)) {
        return status;
      }
    }
    return undefined;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = findTask(active.id as string);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    const overTasks = tasksByStatus[overContainer];
    const overIndex = overTasks.findIndex((t) => t.id === overId);
    const newIndex = overIndex >= 0 ? overIndex : overTasks.length;

    moveTask(activeId, overContainer, newIndex);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      reorderTasks(activeContainer, activeId, overId);
    } else {
      const overTasks = tasksByStatus[overContainer];
      const overIndex = overTasks.findIndex((t) => t.id === overId);
      const newIndex = overIndex >= 0 ? overIndex : overTasks.length;
      moveTask(activeId, overContainer, newIndex);
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex gap-5 p-6">
        {COLUMNS.map((col, index) => (
          <div
            key={col.id}
            className="flex-1 min-w-[300px] max-w-[380px] h-[450px] rounded-xl skeleton"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-5 p-6 overflow-x-auto">
        {COLUMNS.map((col, index) => (
          <div
            key={col.id}
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <KanbanColumn
              id={col.id}
              title={col.title}
              tasks={tasksByStatus[col.id]}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
            />
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="w-[300px]">
            <KanbanCard task={activeTask} onDelete={() => {}} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
