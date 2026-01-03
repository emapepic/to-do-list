import { useState } from "react";

export default function MoreOptions() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="dropdown-wrapper">
            <button className="more-options" onClick={toggleDropdown}>⋮</button>
            {isOpen &&
                <ul className="dropdown">
                    <li>Set due date</li>
                    <li>Set priority</li>
                    <li>Set category</li>
                </ul>
            }
        </div>
    );
}