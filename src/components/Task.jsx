import { CategoryContext } from "./TaskContext";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

export default function Task ({task, deleteTask, completedTask, openEditModal}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const activeCategory = task.category;

    return (
        <CategoryContext.Provider value={{activeCategory}}>
            <li className="list-items">
                <input className='checked-task' type="checkbox" onChange={completedTask} checked={task.completed} />
                <div className='task-info'>
                    <div className="task-desc">
                        <span className={task.completed ? "completed-list-item" : ""}>{task.text}</span>
                    </div>
                    <div className="task-more-info">
                        {task.priority && <span className={`priority priority-${task.priority}`}>{task.priority}</span>}
                        {task.category && <span className="category">{task.category}</span>}
                        {task.dueDate && <span className='due-date'>{task.dueDate}</span>}
                    </div>
                </div>
                <div className="task-btns">
                    <button className="edit-btn" onClick={() => openEditModal(task)}>Edit</button>             
                    <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>Delete</button>         
                </div>
            </li>
            {showDeleteModal && <DeleteModal taskId={task.id} deleteTask={deleteTask} onClose={() => setShowDeleteModal(false)} />}
        </CategoryContext.Provider>
    );
}