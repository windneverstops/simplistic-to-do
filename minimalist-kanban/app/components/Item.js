import SingletonStorageManager from "../scripts/boardSingleton";
import { useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";



const Item = ({ itemId, index }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isDeleted, setDeleted] = useState(false);

    const itemRef = useRef(null);

    const item = new SingletonStorageManager().getItem(itemId)

    const handleHover = () => {
        if (itemRef.current) {
            itemRef.current.classList.add('ring', 'ring-2', 'ring-white')
            setIsHovered(true)
        }

    }

    const handleEndHover = () => {
        if (itemRef.current) {
            itemRef.current.classList.remove('ring', 'ring-2', 'ring-white')
            setIsHovered(false)
        }
    }

    const onDelete = () => {
        item.delete();
        new SingletonStorageManager().uploadToStorage();
        setDeleted(true);

        
    }


    return (
        (!isDeleted && <Draggable draggableId={itemId.toString()} index={index}
           
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div ref={itemRef} className="grid grid-rows-2 grid-cols-1 p-2 bg-red-400 rounded-md" onMouseEnter={handleHover} onMouseLeave={handleEndHover}>
                        <div className="text-xl row-start-1 col-start-1 font-bold text-sm text-center text-white whitespace-pre-wrap hyphens-auto" lang="en">
                            {item.getTitle()}
                        </div>
                        <div className="text-sm row-start-2 col-start-1 whitespace-pre-wrap hyphens-auto text-white flex items-center" lang="en">
                            {item.getDescription()}
                        </div>
                        {isHovered && <div className="row-start-1 col-start-1 font-bold text-sm text-end text-white">
                            <button className="border rounded-full px-1 bg-red-400 hover:bg-red-300" onClick={onDelete}>X</button>
                        </div>}
                    </div>
                </div>
            )}


        </Draggable>)

    )
}
export default Item;