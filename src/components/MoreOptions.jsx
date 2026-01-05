import { useState } from "react";

export default function MoreOptions({setPriority}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showPriority, setShowPriority] = useState(false);

    return (
        <div className="dropdown-wrapper">
            <button className="more-options" onClick={() => setIsOpen(prev => !prev)}>⋮</button>
            {isOpen &&
                <ul className="dropdown">
                    <li>Set due date</li>
                    <li className="dropdown-wrapper" onClick={() => setShowPriority(true)} onMouseLeave={() => setShowPriority(false)}>
                        Set priority
                        {showPriority && (
                            <ul className="dropdown">
                                <li onClick={() => setPriority('low')}>Low</li>
                                <li onClick={() => setPriority('medium')}>Medium</li>
                                <li onClick={() => setPriority('high')}>High</li>
                            </ul>
                            )
                        }
                    </li>
                    <li>Set category</li>
                </ul>
            }
        </div>
    );
}