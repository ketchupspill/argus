"use client";
import Image from "next/image";
import Header from "../components/Header";
import { Task } from "../models/Task";
import TaskCard from "@/components/TaskCard";
import { useState } from "react";
import TaskModal from "@/components/TaskModal";

export default function Home() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
        id: "1",
        title: "Finish Luma MVP",
        description: "Continue building the project",
        priority: 1,
        status: "in_progress",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        title: "Go to the gym",
        description: "Push day",
        priority: 2,
        status: "to_do",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
  ]);

  function addTask(title: string,
                   description: string, 
                   priority: 1 | 2 | 3, 
                   dueDate: string,
                   status: "to_do" | "in_progress" | "completed",
                   estimatedMinutes: string,
                   category: string) {
    const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        priority,
        status: "to_do",
        dueDate: dueDate ? new Date(dueDate) : undefined,
        estimatedMinutes: estimatedMinutes ? Number(estimatedMinutes) : undefined,
        category: category.trim() || undefined,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    setTasks([...tasks, newTask]);
  }

  function updateTask(updatedTask: Task) {
    setTasks(
        tasks.map((task) =>
            task.id === updatedTask.id
                ? updatedTask
                : task
        )
    );
  }

 function completeTask(taskToComplete: Task) {
    const updatedTask: Task = {
        ...taskToComplete,
        status: "completed",
        updatedAt: new Date(),
    };

    updateTask(updatedTask);
  }

  function deleteTask(taskId: string) {
    setTasks(
        tasks.filter((task) => task.id !== taskId)
    );
  }

const activeTasks = tasks.filter(
    (task) => task.status !== "completed"
);

  return (
    <main>
      <Header />
      <p>Your personal assistant.</p>
      <button onClick={() => {setIsTaskModalOpen(true);
                              setTaskToEdit(null);}}>
        + Add Task
      </button>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        taskToEdit={taskToEdit}
      />
      {activeTasks.map((task) => (
      <TaskCard key={task.id} 
                task={task} 
                onEdit={(task) => {setTaskToEdit(task);
                                  setIsTaskModalOpen(true);
                }}
                onComplete={completeTask}
                onDelete={deleteTask}
      />
      
      ))}

    </main>
  );
}
