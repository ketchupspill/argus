import Image from "next/image";
import Header from "../components/Header";
import { Task } from "../models/Task";
import TaskCard from "@/components/TaskCard";

export default function Home() {
  const task: Task = {
    id: "1",

    title: "Finish Luma MVP",

    description: "Continue building the project",

    priority: 1,

    status: "in-progress",

    createdAt: new Date(),

    updatedAt: new Date(),
  }

  return (
    <main>
      <Header />
      <p>Your personal assistant.</p>

      <TaskCard task={task} />
    </main>
  );
}
