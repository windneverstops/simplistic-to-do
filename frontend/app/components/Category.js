import SingletonStorageManager from "../scripts/localStorageScripts/boardSingleton";
import Item from "./Item";
import item from "../scripts/classes/item";
import Key from "./Key";
import { useEffect, useState, useRef } from "react";
import { Droppable } from "@hello-pangea/dnd";

const Category = ({ categoryId, setCategories, categories, index }) => {

    const category = new SingletonStorageManager().getCategory(categoryId);
    const itemsId = category.getItemsId();
    const [showInput, setShowInput] = useState(false);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);



    useEffect(() => {
        if (showInput && titleRef.current) {
            titleRef.current.focus();
        }
    }, [showInput]);


    const handleInputBlur = (e) => {

        if (e.relatedTarget == null) {
            setShowInput(false);
        }
    }



    const addItem = () => {
        setShowInput(!showInput);
    };

    const handleInputChange = (e) => {

        if (e.key === 'Enter' && e.shiftKey) {
            e.target.value += '\n'

        } else if (e.key === 'Enter') {
            const manager = new SingletonStorageManager();
            const title = titleRef.current.value == "" ? "untitled" : titleRef.current.value
            const newItem = new item({ "_title": title, "_description": descriptionRef.current.value });
            category.addItemId(newItem.getId())
            manager.addItem(newItem);
            manager.uploadToStorage();
            setShowInput(false);
            e.target.value = ''; // Clear the input field after adding the item
        } else if (e.key === "Escape") {
            setShowInput(false);
        }

    };



    const leftMost = () => {
        const updatedCategories = [...categories];
        updatedCategories.unshift(updatedCategories.splice(index, 1)[0]);
        setCategories(updatedCategories);
    };

    const left = () => {
        if (index > 0 && index <= categories.length - 1 && categories.length >= 2) {
            const updatedCategories = [...categories];
            [updatedCategories[index], updatedCategories[index - 1]] = [updatedCategories[index - 1], updatedCategories[index]];
            setCategories(updatedCategories);
        }
    };

    const right = () => {
        if (index >= 0 && index < categories.length - 1 && categories.length >= 2) {
            const updatedCategories = [...categories];
            [updatedCategories[index], updatedCategories[index + 1]] = [updatedCategories[index + 1], updatedCategories[index]];
            setCategories(updatedCategories);
        }
    };

    const rightMost = () => {
        const updatedCategories = [...categories];
        updatedCategories.push(updatedCategories.splice(index, 1)[0]);
        setCategories(updatedCategories);
    };

    return (
        (showInput ?
            <div className="flex items-center justify-center h-full w-[250px] min-w-[250px]">
                <kbd className="flex flex-col items-center">
                    <input
                        className="text-center whitespace-normal m-4 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                        type="text"
                        placeholder="title"
                        ref={titleRef}
                        onKeyDown={handleInputChange}
                        onBlur={handleInputBlur}
                        id="input"
                    />
                    <textarea
                        className="text-center whitespace-normal m-4 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                        type="text"
                        placeholder="description"
                        ref={descriptionRef}
                        onKeyDown={handleInputChange}
                        onBlur={handleInputBlur}
                        id="input"
                    />
                    <p>
                        <Key>Enter</Key> - submit
                    </p>
                    <p className="m-4">
                        <Key>Esc</Key> - back
                    </p>
                </kbd>

            </div>
            :
            <>
                <kbd className="flex flex-col h-full w-[250px] min-w-[250px]">

                    <span className="text-center text-xl font-bold text-black flex-none w-full">
                        <Key>{category.getTitle()}</Key>
                    </span>

                    <div className="grow border border-1 rounded-md border-white bg-red-300 overflow-y-auto scroll p-2 overflow-x-hidden">
                        <Droppable
                            droppableId={categoryId.toString()}
                          
                            className="h-full"
                        >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="h-full flex flex-col gap-y-2"
                                >   
                                       
                                 
                                        {
                                            itemsId.map((itemId, index) => {
                                                return <Item itemId={itemId} key={itemId} itemsId={itemsId} index={index}></Item>
                                            })

                                        }
                                 

                                    {provided.placeholder}
                                </div>
                            )}

                        </Droppable>


                    </div>


                    <div className="flex-none flex flex-row justify-around">
                        <button onClick={leftMost} className={`text-3xl hover:text-white transition duration-300 tracking-[-0.2em]`}>{"<<"}</button>
                        <button onClick={left} className="text-3xl hover:text-white transition duration-300">{"<"}</button>
                        <button onClick={addItem} className="text-3xl hover:text-white transition duration-300">+</button>
                        <button onClick={right} className="text-3xl hover:text-white transition duration-300">{">"}</button>
                        <button onClick={rightMost} className="text-3xl hover:text-white transition duration-300 tracking-[-0.2em]">{">>"}</button>
                    </div>

                </kbd>



            </>)


    )
}
export default Category;