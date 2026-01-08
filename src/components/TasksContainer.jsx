import { useState } from 'react';
import Task from './Task.jsx';
import { TaskContext } from './TaskContext.jsx';

export default function TasksContainer({tasks, setTasks, statusFilter}) {  // prosledjujemo setTask kako bi mogli promijeniti niz tasks
    // prosledjuje se id taska koji treba da se obrise i u setTask se ostavljaju samo taskovi koji nemaju taj id
    const [activeTaskId, setActiveTaskId] = useState(null);
    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); 
    }

    // kada se klikne checkbox pokrece se funkcija koja trazi id taska koji je cekiran i mijenja njegovo svojstvo completed, ostale taskove ne mijenja
    const completedTask = (id) => {
        setTasks(prevTasks => 
            prevTasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task)
        )
    }

    const updateTask = (id, newTaskDesc) => {
        setTasks(prevTasks => 
            prevTasks.map(task =>
                task.id === id ? {...task, text: newTaskDesc} : task
            )
        )
    }

    const setPriority = (id, priority) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, priority: priority} : task
            )
        )
    }

    const setDueDate = (id, dueDate) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, dueDate: dueDate} : task
            )
        )
    }

    const setCategory = (id, category) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, category: category} : task
            )
        )
    }

    if (tasks.length === 0) {
        return (
        <div className="task-container">
            <p>No {statusFilter.toLowerCase()} tasks found</p>
        </div>
        );
    }

    // soritra taskove tako da uradjeni idu na dno
    // sort poredi dva elementa niza (a, b) koji su true ili false ili 1 ili 0 i oduzima ih tako ce kada se sortiraju completed biti dolje, ostali gore
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

    return (
        <TaskContext.Provider value={{setCategory, activeTaskId, setActiveTaskId}}>
            <div className='task-container'>
                <ul>
                    {/* komponenti se prosledjuje niz taskova pa koristimo map da svaki task unesemo kao element liste */}
                    {sortedTasks.map((task) => ( // za svaki task u nizu se pravi komponenta Task
                        <Task 
                            key={task.id}
                            task={task}
                            deleteTask={() => deleteTask(task.id)} 
                            completedTask={() => completedTask(task.id)}
                            updateTask={(newTaskDesc) => updateTask(task.id, newTaskDesc)}
                            setDueDate={(dueDate) => setDueDate(task.id, dueDate)}
                            setPriority={(priority) => setPriority(task.id, priority)}
                            setCategory={(category) => setCategory(task.id, category)}
                        /> 
                    ))}
                </ul>             
            </div>
        </TaskContext.Provider>
    );
}