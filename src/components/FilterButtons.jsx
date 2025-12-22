export default function FilterButtons({filter, setFilter}) {
    return(
        <ul className="filters">
            <li><button className={`btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button></li>
            <li><button className={`btn ${filter === 'Active' ? 'active' : ''}`} onClick={() => setFilter('Active')}>Active</button></li>
            <li><button className={`btn ${filter === 'Finished' ? 'active' : ''}`} onClick={() => setFilter('Finished')}>Finished</button></li>
        </ul>
    );
}