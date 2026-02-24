export default function FilterButtons({filter, setFilter}) {
    return(
        <ul className="filters">
            <li>
                <button 
                    className={`btn ${filter === 'All' ? 'active' : ''}`} 
                    onClick={() => setFilter('All')}>
                        All
                </button>
            </li>
            <li>
                <button 
                    className={`btn ${filter === 'Active' ? 'active' : ''}`} 
                    onClick={() => setFilter('Active')}>
                        Active
                </button>
            </li>
            <li>
                <button 
                    className={`btn ${filter === 'Completed' ? 'active' : ''}`} 
                    onClick={() => setFilter('Completed')}>
                        Completed
                </button>
            </li>
        </ul>
    );
}