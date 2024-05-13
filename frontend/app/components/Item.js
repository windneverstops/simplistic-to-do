import { useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useBoardDataContext } from "../contexts/BoardProvider";

const Item = ({ item, itemIndex, boardIndex, categoryIndex }) => {

	const { data, updateData } = useBoardDataContext();
	const [isHovered, setIsHovered] = useState(false);
	const [isDeleted, setDeleted] = useState(false);

	const itemRef = useRef(null);

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
		data[boardIndex].categories[categoryIndex].tasks.splice(itemIndex, 1)
		updateData([...data])
	}


	return (
		<Draggable 
			draggableId={[boardIndex, categoryIndex, itemIndex].toString()} 
			index={itemIndex}
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div ref={itemRef} className="flex flex-col p-2 bg-red-400 rounded-md my-1" onMouseEnter={handleHover} onMouseLeave={handleEndHover}>
						<div className="grid grid-rows-1 grid-cols-1 " >
							<div className="text-xl row-start-1 col-start-1 font-bold text-sm text-center text-white whitespace-pre-wrap hyphens-auto" lang="en">
								{item.title}
							</div>

							{isHovered && <div className="row-start-1 col-start-1 font-bold text-sm text-end text-white">
								<button className="border rounded-full px-1 bg-red-400 hover:bg-red-300" onClick={onDelete}>X</button>
							</div>}
						</div>
						<div className="text-sm row-start-2 col-start-1 whitespace-pre-wrap hyphens-auto text-white flex items-center" lang="en">
							{item.description}
						</div>
					</div>

				</div>
			)}
		</Draggable>)

}
export default Item;