import { useState, useEffect, useRef } from "react";
import category from "../scripts/category";
import SingletonStorageManager from "../scripts/boardSingleton";
import { BarLoader } from "react-spinners";

const Board = ({ existingCategories = [], loading}) => {


    const [categories, setCategories] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null);

    useEffect(() =>{
        setCategories(existingCategories)
    }, [!loading])

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    const addCategory = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (e) => {
 
        const { value } = e.target;
    
        if (value && value.trim() !== '' && e.key === 'Enter') {
            const manager = new SingletonStorageManager();
            const newCategory = new category({ "_title": value.trim() });
            
            manager.addCategory(newCategory);
            manager.uploadToStorage();
            categories.push(newCategory);
            setCategories(categories);
            setShowInput(false);
            e.target.value = ''; // Clear the input field after adding the category
        }
      
    };

    const handleInputBlur = () => {
        setShowInput(true);

    };


    return (
        (loading) ?
            <div className="flex items-center justify-center h-screen">
                <BarLoader
                    color="#000000"
                    height={10}
                    width={200}
                />
            </div>
            :
            <div className="flex flex-row min-h-[90vh] max-h-[90vh] items-center">
                
                <button 
                    className="p-4" 
                    onClick={addCategory}
                >
                    <div className={`items-center text-7xl p-4 transform ${showInput ? 'rotate-45': 'rotate-0'} transition duration-500 hover:text-white`}>
                        +
                    </div>
                    
                </button>
                {showInput && (
                    <input
                        className="text-center whitespace-normal"
                        type="text"
                        placeholder="Enter to submit"
                        ref={inputRef}
                        onKeyDown={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                )}
                {
                     categories.map((category) =>{
                        return (
                            <>
                                T
                            </>
                        )
                    }) 

                }
            </div>
        
        
        
    );
};

export default Board;
