import { useState } from 'react';
import filterIcon from '../assets/filter-icon.svg';

export default function FilterCategories({setFilters, categories}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showPriorities, setShowPriorities] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const toggleMainDropdown = () => {
        setIsOpen(prev => {
            if (prev) {
                setShowPriorities(false);
                setShowCategories(false);
            }

            return !prev;
        });
    }

    return (
        <div className="dropdown-wrapper icon">
                <button onClick={toggleMainDropdown}>
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
                                            toggleMainDropdown()
                                        }}>
                                            All
                                    </li>
                                    <li
                                        onClick={() => {
                                            setFilters(filter => ({...filter, priority: 'low'}));
                                            toggleMainDropdown()
                                        }}>
                                            Low
                                    </li>
                                    <li
                                        onClick={() => {
                                            setFilters(filter => ({...filter, priority: 'medium'}));
                                            toggleMainDropdown()
                                        }}>
                                            Medium
                                    </li>
                                    <li
                                        onClick={() => {
                                            setFilters(filter => ({...filter, priority: 'high'}));
                                            toggleMainDropdown()
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
                                            toggleMainDropdown()
                                        }}>
                                            All
                                    </li>
                                    {categories.map(category => 
                                        <li 
                                            key={category}
                                            onClick={() => {
                                            setFilters(filter => ({...filter, category}));
                                            toggleMainDropdown()
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