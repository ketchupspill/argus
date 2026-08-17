import { useState } from "react";

interface TaskModalProps {
    isOpen: boolean; //open or not
    onClose: () => void;
    onAddTask: (title: string, 
                description: string, 
                priority: 1 | 2 | 3,
                dueDate: string
            ) => void;
}

export default function TaskModal({ isOpen, onClose, onAddTask }: TaskModalProps) {

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<1 | 2 | 3>(3);
    const [dueDate, setDueDate] = useState("");
    

    if (!isOpen) {
        return null;
    }

    function handleAddTask() {
        if (title.trim() === "") {
            setTitleError("Title is required.");
            return;
        }

        setTitleError("");

        onAddTask(title, description, priority, dueDate);

        resetForm();
        onClose();
    }

    function resetForm() {
        setTitle("");
        setDescription("");
        setPriority(3);
        setDueDate("");
        setTitleError("");
        onClose();
    }

    return (
        <div>
            <div>
                <h2>Add Task</h2>

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

                <button onClick={() => handleAddTask()}>
                    Add Task
                </button>

                <button onClick={resetForm}>
                    Cancel
                </button>
            </div>
        </div>
    );

   
}