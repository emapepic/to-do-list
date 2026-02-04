import { useState, useEffect } from "react";
// import { TaskContext, CategoryContext } from "./TaskContext";

export default function TaskCategories({categories, setCategories, onClose}) {    
    const [newCategory, setNewCategory] = useState('');
    // const {setCategory, activeTaskId} = useContext(TaskContext);
    // const {activeCategory} = useContext(CategoryContext);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const addCategory = () => {
        setCategories(prevCategories => [...prevCategories, newCategory]);
        setNewCategory('');
    }

    const deleteCategory = (index) => {
        setCategories(prevCategories => prevCategories.filter((_, i) => i !== index))
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Task categories</h3>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="categories-wrapper">
                    {categories.length>0 && (
                        categories.map((category, index) => 
                            <button
                                key={index}
                                // className={category===activeCategory ? 'categories category-active' : 'categories'}
                                // onClick={() => {setCategory(activeTaskId, category); setIsOpen(false)}}
                                // disabled={category===activeCategory}
                                >
                                    {category}
                                    <span 
                                        style={{marginLeft: '1rem', marginBottom: '0.5rem', opacity: 0.6}}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteCategory(index)}}
                                    >
                                        x
                                    </span>
                            </button>
                        )
                    )}
                </div>
                <div className="input-container">
                    <input 
                        type="text" 
                        value={newCategory} 
                        placeholder="Add new category" 
                        onChange={(e) => setNewCategory(e.target.value)} />
                    <button className="add-btn add-category" onClick={addCategory}>Add</button>
                </div>
            </div>
        </div>
    );
}