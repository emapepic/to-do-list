import { useState } from "react";
import TaskCategories from "./TaskCategories";

export default function MoreOptions({setPriority, setDueDate, dueDate, setActiveTaskId}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showPriority, setShowPriority] = useState(false);
    const [datePicker, setDatePicker] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const openDropdown = () => {
        setActiveTaskId();
        setIsOpen(prev => !prev);
    }

    return (
        <div className="dropdown-wrapper">
            <button className="more-options" onClick={openDropdown}>⋮</button>
            {isOpen &&
                <ul className="dropdown">
                    <li onClick={() => setDatePicker(true)}>
                        Set due date
                    </li>
                    {datePicker && 
                        (<input 
                            type='date' 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)} 
                        />)}
                    <li className="dropdown-wrapper" 
                        onClick={() => setShowPriority(true)} 
                        onMouseLeave={() => setShowPriority(false)}>
                            Set priority
                            {showPriority && (
                                <ul className="dropdown">
                                    <li onClick={() => 
                                        {setPriority('low');
                                        setIsOpen(false);
                                        }}>
                                            Low
                                    </li>
                                    <li onClick={() => 
                                        {setPriority('medium');
                                        setIsOpen(false);
                                        }}>
                                            Medium
                                    </li>
                                    <li onClick={() => 
                                        {setPriority('high');
                                        setIsOpen(false);
                                        }}>
                                            High
                                    </li>
                                </ul>
                                )
                            }
                    </li>
                    <li onClick={() => {setShowCategoryModal(true); setIsOpen(false)}}>
                        Set category
                    </li>
                </ul>
            }
            {showCategoryModal && 
                (<TaskCategories 
                    onClose={() => setShowCategoryModal(false)}
                    setIsOpen={setShowCategoryModal}
                />)}
        </div>
    );
}