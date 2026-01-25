import { useState } from "react";
import { TaskContext, CategoryContext } from "./TaskContext";

export default function Task ({task, deleteTask, completedTask, updateTask}) {
    const [editOn, setEditOn] = useState(false);
    const [newTaskDesc, setNewTaskDesc] = useState();

    const editTask = () => {
        setNewTaskDesc(task.text);
        setEditOn(true);
    }

    const saveTask = () => {
        updateTask(newTaskDesc);
        setEditOn(false);
    }

    const activeCategory = task.category;

    return (
        <CategoryContext.Provider value={{activeCategory}}>
            <li className="list-items">
                <input className='checked-task' type="checkbox" onChange={completedTask} checked={task.completed} />
                <div className="task-desc">
                    {editOn && 
                        <input 
                            type="text" 
                            value={newTaskDesc} 
                            onChange={(e) => setNewTaskDesc(e.target.value)} />
                    }
                    {!editOn && <span className={task.completed ? "completed-list-item" : ""}>{task.text}</span>}
                </div>
                <div className="task-more-info">
                    {task.priority && <span className={`priority-${task.priority}`}>{task.priority}</span>}
                    {task.category && <span className="category">{task.category}</span>}
                    {task.dueDate && <span>{task.dueDate}</span>}
                </div>
                <div className="task-btns">
                    {editOn && <button className="save-btn" onClick={saveTask}>Save</button>}
                    {!editOn && <button className="edit-btn" onClick={editTask}>Edit</button>}               
                    <button className="delete-btn" onClick={deleteTask}>Delete</button>           
                </div>
            </li>
        </CategoryContext.Provider>
    );
}