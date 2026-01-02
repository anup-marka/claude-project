export type TaskStatus = 'todo' | 'in-progress' | 'complete';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
  order: number;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  order: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
}

export const COLUMNS: Column[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'complete', title: 'Complete' },
];
