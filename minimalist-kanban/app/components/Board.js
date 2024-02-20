import { useState, useEffect, useRef } from "react";
import category from "../scripts/category";
import SingletonStorageManager from "../scripts/boardSingleton";
import { BarLoader } from "react-spinners";
import Key from "./Key";
import { DndContext } from "@dnd-kit/core";
import Category from "./Category";
import "../assets/scroll.css"

const Board = ({ existingCategories = [], loading }) => {


    const [categories, setCategories] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);
    const inputRef = useRef(null);
    const clearRef = useRef(null);

    // Initial loading for existingCategories
    
    useEffect(() => {
        setCategories(existingCategories)
    }, [loading])

    // For new category creation input

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    const handleInputBlur = () => {
        setShowInput(false);
    };

    const addCategory = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (e) => {

        const { value } = e.target;

        if (e.key === 'Enter') {
            const manager = new SingletonStorageManager();
            const newCategory = new category({ "_title": value.trim() });
            manager.addCategory(newCategory);
            manager.uploadToStorage();
            categories.push(newCategory);
            setCategories(categories);
            setShowInput(false);
            e.target.value = ''; // Clear the input field after adding the category
        } else if (e.key === "Escape") {
            setShowInput(false);
        }

    };

    // For deleting a category

    const handleCancelDelete = () => {
        setShowDelete(false);
    }

    const handleRemoveCategory = () => {
        setShowDelete(!showDelete);
    }

    const confirmRemoveCategory = () => {
        categories.pop();
        setCategories(categories);
        new SingletonStorageManager().replaceCategoriesWith(categories);
        new SingletonStorageManager().uploadToStorage();
        setShowDelete(false);
    }

    // Handling drag

    const handleDragEnd = (e) => {
        const itemId = e.activatorEvent.srcElement.id;
    }

    // For clearing the local storage

    const handleClearClick = () => {
        if (confirmClear) {
            setConfirmClear(false);
            new SingletonStorageManager().clearStorage();
            setCategories([]);
        } else {
            setConfirmClear(true);
        }
    };

    const handleOutsideClickForClear = (event) => {
        if (confirmClear && !clearRef.current.contains(event.target)) {
            setConfirmClear(false);
        }
    };

    useEffect(() => {
        if (confirmClear) {
            document.addEventListener("click", handleOutsideClickForClear);
        } else {
            document.removeEventListener("click", handleOutsideClickForClear);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClickForClear);
        };
    }, [confirmClear]);


    return (
        // Loading icon
        (loading) ?
            <div className="flex items-center justify-center h-screen">
                <BarLoader
                    color="#000000"
                    height={10}
                    width={200}
                />
            </div>
            :
            // New category input
            (
                showInput ?
                    <div className="flex items-center justify-center h-screen">
                        <kbd className="flex flex-col items-center">
                            <input
                                className="text-center whitespace-normal m-4 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                                type="text"
                                placeholder="untitled"
                                ref={inputRef}
                                onKeyDown={handleInputChange}
                                onBlur={handleInputBlur}
                            />
                            <p>
                                <Key>Enter</Key> - to submit title
                            </p>
                            <p className="m-4">
                                <Key>Esc</Key> - to go back
                            </p>
                        </kbd>

                    </div>
                    :

                    (showDelete ? <div className="flex items-center justify-center h-screen">
                        <kbd className="flex flex-col items-center text-red-500 text-bold text-2xl">
                            <p className="py-6 sm: px-6 hyphens-auto">
                                Are you sure you want to delete the right-most category?
                            </p>

                            <div className="md:space-x-20 text-center flex flex-col sm:flex-row">
                                <button className="border border-2 border-red-400 bg-red-400 text-white rounded p-2 my-4" onClick={confirmRemoveCategory}>
                                    Yes, delete category
                                </button>
                                <button className="border border-2 border-white text-white rounded p-2 my-4" onClick={handleCancelDelete}>
                                    No, don't delete category
                                </button>
                            </div>

                        </kbd>

                    </div> : <div className="flex flex-col overflow-hidden h-screen p-6">
                        <div className="flex flex-row justify-center items-center h-screen">

                            <button
                                className="p-4"
                                onClick={addCategory}
                            >
                                <div className='items-center text-7xl p-4 transition duration-300 hover:text-white'>
                                    +
                                </div>

                            </button>
                            {!categories.length &&
                                <div className="flex flex-row w-screen items-center justify-center">
                                    <p>No categories</p>
                                </div>
                            }
                            {categories.length > 0 &&
                                <div className="flex flex-row w-screen h-full">
                                    <DndContext onDragEnd={handleDragEnd} className="">
                                        {
                                            categories.map((category, index) => {

                                                return (

                                                    <Category key={category.getId()} categoryId={category.getId()} setCategories={setCategories} categories={categories} index={index} />

                                                )
                                            })

                                        }
                                    </DndContext>

                                </div>}


                            <button
                                className="p-4"
                                onClick={handleRemoveCategory}
                            >
                                <div className='items-center text-7xl p-4 hover:text-white transition transition-300'>
                                    -
                                </div>

                            </button>
                        </div>
                        <div className="text-center m-2 font-bold">
                            <button ref={clearRef} onClick={handleClearClick}><Key>{confirmClear ? "Are you sure?" : "Clear"}</Key></button>
                           
                        </div>
                        <div className="text-center text-gray-400 select-none">
                            <p className="whitespace-wrap">
                                Adds categories to the left, removes categories from the right. Categories and items are draggable. @windneverstop on github
                            </p>
                        </div>

                    </div>)


            )




    );
};

export default Board;
