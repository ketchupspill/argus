import Image from "next/image";
import Header from "../components/Header";
import { Task } from "../models/Task";
import TaskCard from "@/components/TaskCard";
// import { useState } from "react";

export default function Home() {
  const tasks: Task[] = [
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
  ]

  return (
    <main>
      <Header />
      <p>Your personal assistant.</p>

      {tasks.map((task) => (
      <TaskCard key={task.id} task={task} />
      ))}
    </main>
  );
}
