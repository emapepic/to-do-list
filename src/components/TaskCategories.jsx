import { useState } from "react";

export default function TaskCategories({onClose}) {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const addCategory = () => {
        setCategories(prevCategories => [...prevCategories, newCategory]);
        setNewCategory('');
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Task categories</h3>
                <div className="categories-wrapper">
                    {categories.length>0 && (
                        categories.map((category, index) => 
                            <button className="categories" key={index}>{category}</button>
                        )
                    )}
                </div>
                <div className="input-container">
                    <input type="text" value={newCategory} placeholder="Add new category" onChange={(e) => setNewCategory(e.target.value)} />
                    <button className="add-btn" onClick={addCategory}>Add</button>
                </div>
                <div className="close-btn-wrapper">
                    <button className="close-btn">Close</button>
                </div>
            </div>
        </div>
    );
}