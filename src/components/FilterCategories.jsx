import { useState } from 'react';
import filterIcon from '../assets/filter-icon.svg';

export default function FilterCategories({setFilters, categories}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showPriorities, setShowPriorities] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    return (
        <div className="dropdown-wrapper">
            <button
                className='icon'
                onClick={() => setIsOpen(prev => !prev)}>
                <img src={filterIcon} />
            </button>
            {isOpen &&
                <ul className="dropdown">
                    <li 
                        className="dropdown-wrapper"
                        onClick={() => setShowPriorities(true)}
                        onMouseLeave={() => setShowPriorities(false)}>
                            By priority
                            {showPriorities && (
                                <ul className="dropdown">
                                    <li
                                        onClick={() => setFilters(filter => ({...filter, priority: 'all'}))}>
                                            All
                                    </li>
                                    <li
                                        onClick={() => setFilters(filter => ({...filter, priority: 'low'}))}>
                                            Low
                                    </li>
                                    <li
                                        onClick={() => setFilters(filter => ({...filter, priority: 'medium'}))}>
                                            Medium
                                    </li>
                                    <li
                                        onClick={() => setFilters(filter => ({...filter, priority: 'high'}))}>
                                            High
                                    </li>
                                </ul>
                                )
                        }
                    </li>
                    <li
                        className="dropdown-wrapper"
                        onClick={() => setShowCategories(true)}
                        onMouseLeave={() => setShowCategories(false)}>
                            By category
                            {showCategories && (
                                <ul className="dropdown">
                                    <li onClick={() => setFilters(filter => ({...filter, category: 'all'}))}>All</li>
                                    {categories.map(category => 
                                        <li 
                                            key={category}
                                            onClick={() => setFilters(filter => ({...filter, category}))}>
                                                {category}
                                        </li>
                                    )}
                                </ul>
                                )
                            }
                    </li>
                </ul>
            }
        </div>
    );
}