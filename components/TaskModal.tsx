import { useState } from "react";

interface TaskModalProps {
    isOpen: boolean; //open or not
    onClose: () => void;
    onAddTask: (title: string, description: string) => void;
}

export default function TaskModal({ isOpen, onClose, onAddTask }: TaskModalProps) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <div>
                <h2>Add Task</h2>

                <button onClick={onClose}>
                    X
                </button>

                
                <label> Title </label>

                <input 
                  type = "text"
                  value = {title}
                  onChange = {(e) => setTitle(e.target.value)}
                />

                <label> Description </label>

                <textarea
                  value = {description}
                  onChange = {(e) => setDescription(e.target.value)}
                />

                <button onClick={() => onAddTask(title, description)}>
                    Add Task
                </button>

                <button onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );

   
}