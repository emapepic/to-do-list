import { useState } from "react";

export default function InputFields({
  inputValue, 
  setInput, 
  addTask, 
  onClose, 
  errorMsg,
  categories
}) {

  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  return (
    <div className='modal-overlay'>
      <div className='modal new-task'>
        <h1>Add new task</h1>
          <div className='input-container'>
            <label>Task title</label>
            <input type="text" value={inputValue} onChange={setInput} />
          </div>
          <div className='task-options'>
            <div className='input-container'>
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
            <div className='input-container'>
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
            <button className='add-btn' onClick={() => addTask(dueDate, priority, category)}>Add task</button>
          </div>
          {errorMsg && <p className="error-msg">You can't save an empty task.</p>}
      </div>
    </div>
  );
}