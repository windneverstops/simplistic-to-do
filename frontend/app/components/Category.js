import Item from "./Item";
import Key from "./Key";
import { useEffect, useState, useRef } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { useBoardDataContext } from "../contexts/BoardProvider";

const Category = ({ category, categoryIndex, boardIndex }) => {

	const { data, updateData } = useBoardDataContext();
	const [items, setItems] = useState([]);
	const [showInput, setShowInput] = useState(false);
	const titleRef = useRef(null);
	const descriptionRef = useRef(null);

	// Load data
	useEffect(() => {
		if (category.tasks.length > 0) {
			setItems(category.tasks)
		}
	}, [category])

	// Inputs
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
			const title = titleRef.current.value == "" ? "untitled" : titleRef.current.value
			const newItem = { "title": title, "description": descriptionRef.current.value };
			data[boardIndex].categories[categoryIndex].tasks.push(newItem)
			updateData([...data])
			console.log(data)
			setShowInput(false);
			e.target.value = ''; // Clear the input field after adding the item
		} else if (e.key === "Escape") {
			setShowInput(false);
		}

	};

	// Shift categories left or right

	const leftMost = () => {

	};

	const left = () => {
		if (categoryIndex > 0 && categoryIndex <= categories.length - 1 && categories.length >= 2) {

		}
	};

	const right = () => {
		if (categoryIndex >= 0 && categoryIndex < categories.length - 1 && categories.length >= 2) {

		}
	};

	const rightMost = () => {

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
						<Key>{category.title}</Key>
					</span>

					<div className="grow border border-1 rounded-md border-white bg-red-300 overflow-y-auto scroll p-2 overflow-x-hidden">
						<Droppable
							droppableId = { categoryIndex.toString() }

							className="h-full"
						>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="h-full flex flex-col gap-y-2"
								>
									{
										items.map((item, index) => {
											return <Item key={index} item={item} itemIndex={index} categoryIndex={categoryIndex}  boardIndex></Item>
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