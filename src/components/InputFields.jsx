import { useState } from "react";

export default function InputFields({
  saveTask, 
  onClose, 
  errorMsg,
  categories,
  editingTask
}) {

  const [text, setText] = useState(editingTask ? editingTask.text : '');
  const [priority, setPriority] = useState(editingTask ? editingTask.priority : '');
  const [category, setCategory] = useState(editingTask ? editingTask.category : '');
  const [dueDate, setDueDate] = useState(editingTask ? editingTask.dueDate : '');

  return (
    <div className='modal-overlay'>
      <div className='modal new-task'>
        <h1>{editingTask ? "Edit Task" : "Add new task"}</h1>
          <div className='input-container'>
            <label>Task title</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className='task-options'>
            <div className='input-container'>
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value='' disabled>Select priority</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
            <div className='input-container'>
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value='' disabled>Select category</option>
                {categories.map((category, index) =>
                  <option key={index}>{category}</option> 
                )}
              </select>
            </div>
          </div>
          <div className='input-container'>
            <label>Due date</label>
            <input type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div className='input-btns-container'>
            <button onClick={onClose}>Cancel</button>
            <button 
              className='add-btn' 
              onClick={() => saveTask(text, priority, category, dueDate)}>
                {editingTask ? "Save changes" : "Add task"}
            </button>
          </div>
          {errorMsg && <p className="error-msg">You can't save an empty task.</p>}
      </div>
    </div>
  );
}