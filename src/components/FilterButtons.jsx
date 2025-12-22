export default function FilterButtons({setFilter}) {
    return(
        <ul className="filters">
            <li><button className="btn" onClick={() => setFilter('All')}>All</button></li>
            <li><button className="btn" onClick={() => setFilter('Active')}>Active</button></li>
            <li><button className="btn" onClick={() => setFilter('Finished')}>Finished</button></li>
        </ul>
    );
}