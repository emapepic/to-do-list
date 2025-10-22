export default function Task ({taskDesc, deleteTask}) {
    return (
        <li className="list-items">
            {taskDesc}
            <div className="task-btns">
                <input type="checkbox" />
                <button className="delete-btn" onClick={deleteTask}>Delete</button> {/* ovdje pozivamo funkciju za brisanje */}
            </div>
        </li>
    );
}