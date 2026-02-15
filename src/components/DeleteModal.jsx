export default function DeleteModal({taskId, deleteTask, onClose}) {

    return (
        <div className='modal-overlay'>
            <div className='modal delete-task'>
                <h3>Are you sure you want to delete task</h3>
                <div className="btns-wrapper">
                    <button onClick={() => deleteTask(taskId)}>Yes</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}