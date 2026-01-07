import { useState, useContext, useEffect } from "react";
import { TaskContext } from "./TaskContext";

export default function TaskCategories({onClose}) {
    const [categories, setCategories] = useState(() => {
        const savedCategories = localStorage.getItem('categories');
        return savedCategories ? JSON.parse(savedCategories) : [];
    });
    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);
    const [newCategory, setNewCategory] = useState('');
    const {setCategory, activeTaskId} = useContext(TaskContext);

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
                            <button className="categories" key={index} onClick={() => setCategory(activeTaskId, category)}>{category}</button>
                        )
                    )}
                </div>
                <div className="input-container">
                    <input type="text" value={newCategory} placeholder="Add new category" onChange={(e) => setNewCategory(e.target.value)} />
                    <button className="add-btn" onClick={addCategory}>Add</button>
                </div>
                <div className="close-btn-wrapper">
                    <button className="close-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}