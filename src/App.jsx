import {useState} from 'react';
import Header from './components/Header.jsx';
import InputFields from './components/InputFields.jsx';
import TasksContainer from './components/TasksContainer.jsx';
import FilterButtons from './components/FilterButtons.jsx';

function App() {
  const [showInputFields, setShowInputFields] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

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

  return (
    <>
      <Header/>      
      <div className='main-container'>
        <FilterButtons />
        {tasks.length > 0 ? <TasksContainer tasks={tasks} setTasks={setTasks} /> : <p>There's no tasks to complete, create new ones :)</p> }
        {/*da bi uzeli sta je uneseno u input polje koristimo setInput da vrijednost stavimo u value
          tu vrijednost u funkciji addTask stavljamo u niz postojecih taskova*/}
        {showInputFields && <InputFields inputValue={inputValue} setInput={(e) => setInputValue(e.target.value)} addTask={addTask}/>}
        <button className='add-btn' onClick={showInputField}>Add task</button>
      </div>
    </>
  )
}

export default App
