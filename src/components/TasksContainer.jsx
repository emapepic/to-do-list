import Task from './Task.jsx';

export default function TasksContainer({tasks, setTasks}) { {/* prosledjujemo setTask kako bi mogli promijeniti niz tasks */}
    const deleteTask = (index) => { {/* pravimo funkciju za brisanje */}
        setTasks(prev => prev.filter((_, id) => id != index)); {/* _ predstavlja elemenat al nam on nije potreban pa ga oznacavamo sa _ */}
    }
    return (
        <div className='task-container'>
            <ul>
                {/* komponenti se prosledjuje niz taskova pa koristimo map da svaki task unesemo kao element liste */}
                {tasks.map((task, index) => (
                    <Task key={index} taskDesc={task} deleteTask={() => deleteTask(index)}/> 
                ))} {/* prosledjujemo funkciju za brisanje komponenti Task koja je ima kao prop */}
            </ul>
        </div>
    );
}