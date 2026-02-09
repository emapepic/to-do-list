import {useState, useEffect} from 'react';
import Header from './components/Header.jsx';
import InputFields from './components/InputFields.jsx';
import TasksContainer from './components/TasksContainer.jsx';
import FilterButtons from './components/FilterButtons.jsx';
import FilterCategories from './components/FilterCategories.jsx';
import TaskCategories from './components/TaskCategories.jsx';
import sortIcon from './assets/sort-icon.svg';

function App() {
  const [showInputFields, setShowInputFields] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  // prikazemo initial state iz localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editingTask, setEditingTask] = useState(null);

   const [sortOrderAsc, setSortOrderAsc] = useState(null);

  const [statusFilter, setStatusFilter] = useState('All');
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all'
  });

  const [searchingTasks, setSearchingTasks] = useState('');

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  // niz task se cuva u localStorage kad dodje do njegove promjene
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function showCategoriesModal() {
    setShowCategoryModal(true);
  }

  const openAddModal = () => {
    setEditingTask(null);   
    setShowInputFields(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);   
    setShowInputFields(true); 
  };

  function saveTask(text, priority, category, dueDate) {
    if (text.trim() === '') {
      setErrorMsg(true);
      return;
    }

    setTasks(prevTasks => {
      if (editingTask) {
        return prevTasks.map(task =>
          task.id === editingTask.id ? { ...task, text, priority, category, dueDate } : task
        );
      } else {
        const newTask = {
          id: crypto.randomUUID(),
          text,
          completed: false,
          dueDate: dueDate || null,
          priority: priority || null,
          category: category || null
        };
        return [...prevTasks, newTask];
      }
    });

    setEditingTask(null);
    setShowInputFields(false);
    setErrorMsg(false);
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
            <div className='icon'>
              <button onClick={sortTasks}><img src={sortIcon} /></button>
            </div>
            <FilterCategories
              setFilters={setFilters}
              categories={[...new Set(tasks.map(task => task.category).filter(category => category != null))]}
            />
          </div>
        </div>
        <div className='btns-container'>
          <div className='btns-wrapper'>
            <button className='add-btn' onClick={openAddModal}>Add task</button>
            <button onClick={showCategoriesModal}>Categories</button>
          </div>
          {filteredTasks.length > 0 && 
              (<p className='num-of-tasks'>{filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}</p>)}
        </div>
        {tasks.length > 0 ? 
          <TasksContainer tasks={filteredTasks} setTasks={setTasks} openEditModal={openEditModal} /> : 
          <p style={{textAlign: 'center'}}>
            There's no tasks to complete, create new ones 🙂
          </p>
        }
        {showInputFields && 
          <InputFields
            saveTask={saveTask}
            onClose={() => setShowInputFields(false)}
            errorMsg={errorMsg}
            categories={categories} 
            editingTask={editingTask}
          />
        }
        {showCategoryModal && 
          (<TaskCategories
            categories={categories} 
            setCategories={setCategories}
            onClose={() => setShowCategoryModal(false)}
            />)
        }
      </div>
    </>
  )
}

export default App
