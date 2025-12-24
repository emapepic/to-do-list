import { useState } from "react";

export default function Task ({taskDesc, deleteTask, completedTask, checked, updateTask}) {
    const [editOn, setEditOn] = useState(false);
    const [newTaskDesc, setNewTaskDesc] = useState();

    const editTask = () => {
        setNewTaskDesc(taskDesc);
        setEditOn(true);
    }

    const saveTask = () => {
        updateTask(newTaskDesc);
        setEditOn(false);
    }

    return (
        <li className="list-items">
            {editOn && <input type="text" value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} />}
            {!editOn && <span className={checked ? "completed-list-item" : ""}>{taskDesc}</span>}
            <div className="task-btns">
                <input type="checkbox" onChange={completedTask} checked={checked} />
                {editOn && <button className="save-btn" onClick={saveTask}>Save</button>}
                {!editOn && <button className="edit-btn" onClick={editTask}>Edit</button>}               
                <button className="delete-btn" onClick={deleteTask}>Delete</button>               
            </div>
        </li>
    );
}