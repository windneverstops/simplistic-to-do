import { useState, useEffect, useRef } from "react";
import category from "../scripts/category";
import SingletonStorageManager from "../scripts/boardSingleton";
import { BarLoader } from "react-spinners";
import Key from "./Key";
import { DndContext } from "@dnd-kit/core";
import Category from "./Category";

const Board = ({ existingCategories = [], loading }) => {


    const [categories, setCategories] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const inputRef = useRef(null);
    const deleteRef = useRef(null);

    useEffect(() => {
        setCategories(existingCategories)
    }, [!loading])

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);


    const handleInputBlur = () => {
        setShowInput(false);

    };

    const handleCancelDelete = () => {
        setShowDelete(false);
    }

    const addCategory = () => {
        setShowInput(!showInput);
    };

    const handleRemoveCategory = () => {
        setShowDelete(!showDelete)
    }

    const confirmRemoveCategory = () => {
        categories.pop();
        setCategories(categories);
        new SingletonStorageManager().replaceCategoriesWith(categories);
        new SingletonStorageManager().uploadToStorage()
        setShowDelete(false);
    }

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
        } else if (e.key === "Escape") {
            setShowInput(false);
        }

    };

    const handleDragEnd = (e) => {
        const itemId = e.activatorEvent.srcElement.id;
    }




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
                            <div className="py-6">
                                Are you sure you want to delete the right-most category?
                            </div>

                            <div className="md:space-x-20">
                                <button className="border border-2 border-red-400 bg-red-400 text-white rounded p-2 my-4" onClick={confirmRemoveCategory}>
                                    Yes, delete category
                                </button>
                                <button className="border border-2 border-white text-white rounded p-2 my-4" onClick={handleCancelDelete}>
                                    No, don't delete category
                                </button>
                            </div>



                        </kbd>

                    </div> : <div className="overflow-hidden">
                        <div className="flex flex-row justify-center items-center h-screen pt-10">

                            <button
                                className="p-4"
                                onClick={addCategory}
                            >
                                <div className='items-center text-7xl p-4 transform  transition duration-300 hover:text-white'>
                                    +
                                </div>

                            </button>


                            {!categories.length &&
                                <div className="flex flex-row w-screen items-center justify-center overflow-x-auto">
                                    <p>No categories</p>
                                </div>
                            }
                            {categories.length > 0 &&
                                <div className="flex flex-row w-screen overflow-x-auto">
                                    <DndContext onDragEnd={handleDragEnd} >
                                        {

                                            categories.map((category) => {
                                                console.log(categories)
                                                console.log("RUNS")
                                                return (

                                                    <Category key={category.getId()}>
                                                        {category.getId()}

                                                    </Category>


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
                        <div className="absolute inset-x-0 bottom-0 text-center text-gray-400 select-none">

                            <p className="whitespace-wrap">
                                Adds categories to the left, removes categories from the right. Categories and items are draggable. @windneverstop on github
                            </p>
                        </div>

                    </div>)


            )




    );
};

export default Board;
