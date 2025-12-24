import {useState, useEffect} from 'react';
import Header from './components/Header.jsx';
import InputFields from './components/InputFields.jsx';
import TasksContainer from './components/TasksContainer.jsx';
import FilterButtons from './components/FilterButtons.jsx';

function App() {
  const [showInputFields, setShowInputFields] = useState(false);

  // prikazemo initial state iz localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All');

  function showInputField() {
    setShowInputFields(true);
  }

  function addTask() {
    // da se u niz postojecih taskova doda novi task koji je unesen u input polje
    if(inputValue!='') {
      setTasks(prevTasks => [...prevTasks, 
              {id: crypto.randomUUID(), text: inputValue, completed: false}]); // svaka stavka je objekat koji sadrzi id, tekst i podatak da li je completed ili ne
              // crypto.randomUUID generise jedinstveni id
      setInputValue('');
      setShowInputFields(false);
    }
  }

  // niz task se cuva u localStorage kad dodje do njegove promjene
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') {
      return !task.completed;
    }
    if (filter === 'Finished') {
      return task.completed;
    }
    return true;
  });

  return (
    <>
      <Header/>      
      <div className='main-container'>
        <div className='tasks-header'>
          <FilterButtons filter={filter} setFilter={setFilter} />
          {filteredTasks.length > 0 && (<p className='num-of-tasks'>{filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}</p>)}
        </div>
        {tasks.length > 0 ? <TasksContainer tasks={filteredTasks} setTasks={setTasks} filter={filter} /> : <p style={{color: 'whitesmoke'}}>There's no tasks to complete, create new ones 🙂</p> }
        {/*da bi uzeli sta je uneseno u input polje koristimo setInput da vrijednost stavimo u value
          tu vrijednost u funkciji addTask stavljamo u niz postojecih taskova*/}
        {showInputFields && <InputFields inputValue={inputValue} setInput={(e) => setInputValue(e.target.value)} addTask={addTask}/>}
        <button className='add-btn' onClick={showInputField}>Add task</button>
      </div>
    </>
  )
}

export default App
