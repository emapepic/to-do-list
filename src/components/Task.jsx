import { useState } from "react";
import MoreOptions from "./MoreOptions";

export default function Task ({task, deleteTask, completedTask, updateTask, setPriority, setDueDate}) {
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

    return (
        <li className="list-items">
            <div className="task-desc">
                {editOn && <input type="text" value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} />}
                {!editOn && <span className={task.completed ? "completed-list-item" : ""}>{task.text}</span>}
                {task.priority && <span className={`priority-${task.priority}`}>{task.priority}</span>}
                {task.dueDate && <span>{task.dueDate}</span>}
            </div>
            <div className="task-btns">
                <input type="checkbox" onChange={completedTask} checked={task.completed} />
                {editOn && <button className="save-btn" onClick={saveTask}>Save</button>}
                {!editOn && <button className="edit-btn" onClick={editTask}>Edit</button>}               
                <button className="delete-btn" onClick={deleteTask}>Delete</button>
                <MoreOptions setPriority={setPriority} setDueDate={setDueDate} dueDate={task.dueDate} />             
            </div>
        </li>
    );
}