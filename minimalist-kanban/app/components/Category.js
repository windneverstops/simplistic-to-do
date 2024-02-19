import SingletonStorageManager from "../scripts/boardSingleton";
import { useDroppable } from "@dnd-kit/core";
import Item from "./Item";
import item from "../scripts/item";
import Key from "./Key";
import { useEffect, useState, useRef } from "react";
const Category = ({categoryId, setCategories, categories, index}) =>{

    const category = new SingletonStorageManager().getCategory(categoryId);
    const [itemsId, setItemsId] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(true);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (showInput && titleRef.current) {
            titleRef.current.focus();
        }
        }, [showInput]);

    useEffect(() => {
        if (loading){
            const res = [];
        
            for (const id of category.getItemsId()){
                res.push(id)
            }  
            
            setItemsId(res);
            setLoading(!loading);
            
        }
   
        console.log(itemsId)
    }, [itemsId])

    const handleInputBlur = (e) =>{
       
        console.log(e)
        if (e.relatedTarget == null){
            setShowInput(false);
        }
    }

   

    const addItem = () => {
            setShowInput(!showInput);
        };

    const handleInputChange = (e) => {

        if (e.key === 'Enter' && e.shiftKey){
            e.target.value += '\n'
            
        }else if (e.key === 'Enter') {
            const manager = new SingletonStorageManager();
            const title = titleRef.current.value == "" ? "untitled" : titleRef.current.value
            const newItem = new item({ "_title": title, "_description":descriptionRef.current.value });
            category.addItemId(newItem.getId())
            manager.addItem(newItem);
            manager.uploadToStorage();
            itemsId.push(newItem.getId());
            
            setShowInput(false);
            setItemsId(itemsId);
            e.target.value = ''; // Clear the input field after adding the item
        } else if (e.key === "Escape") {
            setShowInput(false);
        }


        };


    const {setNodeRef} = useDroppable({
        id: categoryId,
    });

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
            <div className="flex items-center justify-center h-[90vh] w-[200px] m-1">
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
            <kbd className="parent flex flex-col min-h-[90vh] min-w-[200px] w-[250px] m-1 " ref={setNodeRef}>
               
                <span className="text-center text-xl font-bold text-black">
                {category.getTitle()}
                </span>
                     
              
                <div className="border border-1 rounded border-red-400 bg-white h-[83vh] mt-4 mx-1 overflow-y-auto overflow-x-hidden"> 
                    
                {           
                    itemsId.map((itemId) =>{   
                        return <Item itemId = {itemId} key = {itemId}></Item>
                    })  

                }
                    
                    
                </div>
                <div className="flex flex-row justify-around">
                    <button onClick={leftMost} className={`text-3xl hover:text-white transition duration-300 tracking-[-0.3em]`}>{"<<"}</button>
                    <button onClick={left} className="text-3xl hover:text-white transition duration-300">{"<"}</button>
                    <button onClick={addItem} className="text-3xl hover:text-white transition duration-300">+</button>
                    <button onClick={right} className="text-3xl hover:text-white transition duration-300">{">"}</button>
                    <button onClick={rightMost} className="text-3xl hover:text-white transition duration-300 tracking-[-0.3em]">{">>"}</button>
                </div>
                
            </kbd>
            
        </>)
        
        
    )
}
export default Category;