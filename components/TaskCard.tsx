
import { Task } from "../models/Task";

interface TaskCardProps {
    task: Task;
}

export default function TaskCard(props: TaskCardProps) {
    return (
        <div>
            <h2>{props.task.title}</h2>

            <p>{props.task.description}</p>

            <p>Priority: {props.task.priority}</p>

            <p>Status: {props.task.status}</p>
        </div>
    );
}