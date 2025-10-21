import Task from './Task.jsx';

export default function TasksContainer({tasks}) {
    return (
        <div className='task-container'>
            <ul>
                {/* komponenti se prosledjuje niz taskova pa koristimo map da svaki task unesemo kao element liste */}
                {tasks.map((task, index) => (
                    <Task key={index} taskDesc={task}/>
                ))}
            </ul>
        </div>
    );
}