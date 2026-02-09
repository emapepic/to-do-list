import { useState } from 'react';
import filterIcon from '../assets/filter-icon.svg';

export default function FilterCategories({setFilters, categories}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showPriorities, setShowPriorities] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    return (
        <div className="dropdown-wrapper icon">
                <button onClick={() => setIsOpen(prev => !prev)}>
                    <img src={filterIcon} />
                </button>
            {isOpen &&
                <ul className="dropdown dropdown-filter">
                    <li 
                        className="dropdown-wrapper"
                        onClick={() => setShowPriorities(true)}
                        onMouseLeave={() => setShowPriorities(false)}>
                            By priority
                            {showPriorities && (
                                <ul className="dropdown">
                                    <li
                                        onClick={() => {
                                            setFilters(filter => ({...filter, priority: 'all'}));
                                            setIsOpen(false)
                                        }}>
                                            All
                                    </li>
                                    <li
                                        onClick={() => {
                                            setFilters(filter => ({...filter, priority: 'low'}));
                                            setIsOpen(false)
                                        }}>
                                            Low
                                    </li>
                                    <li
                                        onClick={() => {
                                            setFilters(filter => ({...filter, priority: 'medium'}));
                                            setIsOpen(false)
                                        }}>
                                            Medium
                                    </li>
                                    <li
                                        onClick={() => {
                                            setFilters(filter => ({...filter, priority: 'high'}));
                                            setIsOpen(false)
                                        }}>
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
                                    <li onClick={() => {
                                            setFilters(filter => ({...filter, category: 'all'}));
                                            setIsOpen(false)
                                        }}>
                                            All
                                    </li>
                                    {categories.map(category => 
                                        <li 
                                            key={category}
                                            onClick={() => {
                                            setFilters(filter => ({...filter, category}));
                                            setIsOpen(false)
                                        }}>
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