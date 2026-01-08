import {useState, useEffect} from 'react';
import Header from './components/Header.jsx';
import InputFields from './components/InputFields.jsx';
import TasksContainer from './components/TasksContainer.jsx';
import FilterButtons from './components/FilterButtons.jsx';
import FilterCategories from './components/FilterCategories.jsx';
import sortIcon from './assets/sort-icon.svg';

function App() {
  const [showInputFields, setShowInputFields] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  // prikazemo initial state iz localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrderAsc, setSortOrderAsc] = useState(null);
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all'
  });
  const [searchingTasks, setSearchingTasks] = useState('');

  // niz task se cuva u localStorage kad dodje do njegove promjene
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function showInputField() {
    setShowInputFields(true);
  }

  function addTask() {
    // da se u niz postojecih taskova doda novi task koji je unesen u input polje
    if(inputValue.trim()!='') {
      setTasks(prevTasks => [...prevTasks, 
              {id: crypto.randomUUID(), // crypto.randomUUID generise jedinstveni id
               text: inputValue, 
               completed: false, 
               dueDate: null, 
               priority: null, 
               category: null}]);           
      setInputValue('');
      setShowInputFields(false);
      setErrorMsg(false)
    }
    else setErrorMsg(true);
  }

  function sortTasks() {
    const sorted = [...tasks].sort((a, b) => {  
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);  

      if (sortOrderAsc === null) return dateA - dateB;
      return sortOrderAsc ? dateA - dateB : dateB - dateA;
    });

    setTasks(sorted);
    setSortOrderAsc(prev => (prev === null ? true : !prev));
  }

  const filteredByStatus = tasks.filter(task => {
    if (statusFilter === 'Active') {
      return !task.completed;
    }
    if (statusFilter === 'Finished') {
      return task.completed;
    }
    return true;
  });

  const filteredTasks = filteredByStatus
  // za filter
  .filter(task => {
    const byPriority = filters.priority === 'all' || task.priority === filters.priority;
    const byCategory = filters.category === 'all' || task.category === filters.category;

    return byPriority && byCategory;
  })
  // za search
  .filter(task => {
    return task.text.toLowerCase().includes(searchingTasks.toLowerCase())
  });

  function onRemoveFilter(filterType) {
    setFilters(prev => {
      if (filterType === 'priority') {
        return {...prev, priority: 'all'};
      }

      if (filterType === 'category') {
        return {...prev, category: 'all'};
      }
    })
  }
  
  return (
    <>
      <Header />
      <div className='main-container'>
        <div className='tasks-header'>
          <FilterButtons filter={statusFilter} setFilter={setStatusFilter} />
          <div className='tasks-header-btns'>
            <input
              id='search-bar'
              type='text'
              placeholder='Search tasks'
              value={searchingTasks}
              onChange={(e) => setSearchingTasks(e.target.value)}
            />
            {filters.priority !== 'all' && 
              <span className='active-filter'>
                {filters.priority} 
                <span onClick={() => onRemoveFilter('priority')}>
                  x
                </span>
              </span>}
            {filters.category !== 'all' && 
              <span className='active-filter'>
                {filters.category} 
                <span onClick={() => onRemoveFilter('category')}>
                  x
                </span>
              </span>}
            <button className='icon' onClick={sortTasks}><img src={sortIcon} /></button>
            <FilterCategories
              setFilters={setFilters}
              categories={[...new Set(tasks.map(task => task.category))]}
            />
            {filteredTasks.length > 0 && 
              (<p className='num-of-tasks'>{filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}</p>)}
          </div>
        </div>
        {tasks.length > 0 ? 
          <TasksContainer tasks={filteredTasks} setTasks={setTasks} /> : 
          <p style={{color: 'whitesmoke'}}>
            There's no tasks to complete, create new ones 🙂
          </p>
        }
        {/*da bi uzeli sta je uneseno u input polje koristimo setInput da vrijednost stavimo u value
          tu vrijednost u funkciji addTask stavljamo u niz postojecih taskova*/}
        {showInputFields && 
          <InputFields 
            inputValue={inputValue}
            setInput={(e) => setInputValue(e.target.value)}
            addTask={addTask}
            errorMsg={errorMsg} 
          />
        }
        <div className='add-btn-wrapper'>
          <button className='add-btn' onClick={showInputField}>Add task</button>
        </div>
      </div>
    </>
  )
}

export default App
