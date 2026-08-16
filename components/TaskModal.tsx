interface TaskModalProps {
    isOpen: boolean; //open or not
    onClose: () => void;
}

export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
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

                <p>Enter Task details.</p>

                <button onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
}