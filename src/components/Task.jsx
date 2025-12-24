export default function Task ({taskDesc, deleteTask, completedTask, checked}) {
    return (
        <li className="list-items">
            <span className={checked ? "completed-list-item" : ""}>{taskDesc}</span>
            <div className="task-btns">
                <input type="checkbox" onChange={completedTask} checked={checked} />
                <button className="delete-btn" onClick={deleteTask}>Delete</button>
            </div>
        </li>
    );
}