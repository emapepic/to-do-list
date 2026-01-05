import Task from './Task.jsx';

export default function TasksContainer({tasks, setTasks, filter}) {  // prosledjujemo setTask kako bi mogli promijeniti niz tasks
    // prosledjuje se id taska koji treba da se obrise i u setTask se ostavljaju samo taskovi koji nemaju taj id
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

    if (tasks.length === 0) {
        return (
        <div className="task-container">
            <p>No {filter.toLowerCase()} tasks found</p>
        </div>
        );
    }

    // soritra taskove tako da uradjeni idu na dno
    // sort poredi dva elementa niza (a, b) koji su true ili false ili 1 ili 0 i oduzima ih tako ce kada se sortiraju completed biti dolje, ostali gore
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

    return (
        <div className='task-container'>
            <ul>
                {/* komponenti se prosledjuje niz taskova pa koristimo map da svaki task unesemo kao element liste */}
                {sortedTasks.map((task) => ( // za svaki task u nizu se pravi komponenta Task
                    <Task 
                        key={task.id}
                        taskDesc={task.text}
                        checked={task.completed} 
                        deleteTask={() => deleteTask(task.id)} 
                        completedTask={() => completedTask(task.id)}
                        updateTask={(newTaskDesc) => updateTask(task.id, newTaskDesc)}
                        setPriority={(priority) => setPriority(task.id, priority)}
                    /> 
                ))}
            </ul>
        </div>
    );
}