"use client";
import Image from "next/image";
import Header from "../components/Header";
import { Task } from "../models/Task";
import TaskCard from "@/components/TaskCard";
import { useState } from "react";
import TaskModal from "@/components/TaskModal";

export default function Home() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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

  function addTask(title: string, description: string) {
    const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        priority: 3,
        status: "to_do",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    setTasks([...tasks, newTask]);
}

  return (
    <main>
      <Header />
      <p>Your personal assistant.</p>
      {/* <button onClick={(addTask)}>Add Task</button> */}
      <button onClick={() => setIsTaskModalOpen(true)}>
        + Add Task
      </button>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={addTask}
      />
      {tasks.map((task) => (
      <TaskCard key={task.id} task={task} />
      // a change. going to implement a more nuanced way of representing tasks
      //possibly use a different map?
      // will decide and implement today!
      // still need to implement a way to add tasks, and a way to edit them. will do that next.
      ))}
    </main>
  );
}
