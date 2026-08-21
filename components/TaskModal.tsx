import { Task } from "@/models/Task";
import { useState, useEffect } from "react";

interface TaskModalProps {
    isOpen: boolean; //open or not
    onClose: () => void;
    onAddTask: (title: string,
                description: string,
                priority: 1 | 2 | 3,
                dueDate: string,
                estimatedMinutes: string,
                category: string
            ) => void;

    onUpdateTask: (updatedTask: Task) => void;
    
    taskToEdit: Task | null;
}

export default function TaskModal({ isOpen, onClose, onAddTask, taskToEdit, onUpdateTask }: TaskModalProps) {

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<1 | 2 | 3>(3);
    const [dueDate, setDueDate] = useState("");
    const isEditing = taskToEdit !== null;
    const [estimatedMinutes, setEstimatedMinutes] = useState("");
    const [category, setCategory] = useState("");
    
    useEffect(() => {
        if (!taskToEdit) {
            return;
        }

        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description ?? "");
        setPriority(taskToEdit.priority);
        setDueDate(
            taskToEdit.dueDate
                ? taskToEdit.dueDate.toISOString().split("T")[0]
                : ""
        );
        setEstimatedMinutes(
            taskToEdit.estimatedMinutes?.toString() ?? ""
        );
        setCategory(taskToEdit.category ?? "");
        }, [taskToEdit]);

    if (!isOpen) {
        return null;
    }

    function handleSave() {
        if (title.trim() === "") {
            setTitleError("Title is required.");
            return;
        }

        setTitleError("");

        if (isEditing && taskToEdit) {
            const updatedTask: Task = {
                ...taskToEdit,
                title,
                description,
                priority,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                estimatedMinutes: estimatedMinutes
                    ? Number(estimatedMinutes)
                    : undefined,
                category: category.trim() || undefined,
                updatedAt: new Date(),
            };

            onUpdateTask(updatedTask);
        } else {
            onAddTask(title, 
                      description, 
                      priority, 
                      dueDate, 
                      estimatedMinutes, 
                      category
            );
        }

        resetForm();
    }

    function resetForm() {
        setTitle("");
        setDescription("");
        setPriority(3);
        setDueDate("");
        setEstimatedMinutes("");
        setCategory("");
        setTitleError("");
        onClose();
    }

    return (
        <div>
            <div>
                <h2>{isEditing ? "Edit Task" : "Add Task"}</h2>

                <label>Title</label>

                <input 
                  type = "text"
                  value = {title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleError("");
                  }}
                />

                {titleError && <p>{titleError}</p>}

                <label>Description</label>

                <textarea
                  value = {description}
                  onChange = {(e) => setDescription(e.target.value)}
                />

                <label>Priority</label>

                <select
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
                >
                    <option value={1}>1 - High</option>
                    <option value={2}>2 - Medium</option>
                    <option value={3}>3 - Low</option>
                </select>

                <label>Due Date</label>

                <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <label>Estimated Time (minutes)</label>

                <input
                    type="number"
                    min="1"
                    value={estimatedMinutes}
                    onChange={(e) => setEstimatedMinutes(e.target.value)}
                />

                <label>Category</label>

                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button onClick={() => handleSave()}>
                    {isEditing ? "Save Changes" : "Add Task"}
                </button>

                <button onClick={resetForm}>
                    Cancel
                </button>
            </div>
        </div>
    );

   
}