
import { Task } from "../models/Task";

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onComplete: (task: Task) => void;
    onDelete: (taskID: string) => void;
}

export default function TaskCard(props: TaskCardProps) {
    return (
        <div>
            <h2>{props.task.title}</h2>

            <p>{props.task.description}</p>

            <p>Priority: {props.task.priority}</p>

            <p>Status: {props.task.status}</p>

            {props.task.dueDate && (
                <p>Due: {props.task.dueDate.toLocaleDateString()}</p>
            )}

            <p>Estimated Minutes: {props.task.estimatedMinutes ?? "N/A"}</p>

            <p>Category: {props.task.category ?? "N/A"}</p>

            <button onClick={() => props.onEdit(props.task)}>
                Edit
            </button>

            <button onClick={() => props.onComplete(props.task)}>
                Complete 
            </button>

            <button onClick={() => props.onDelete(props.task.id)}>
                Delete
            </button>
        </div>
    );
}