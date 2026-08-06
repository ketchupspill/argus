export type Priority = 1 | 2 | 3;
export type Status = "to_do" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}