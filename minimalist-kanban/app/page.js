"use client";
import Board from "./components/Board"
import sessionboard from "./scripts/sessionboard"
import item from "./scripts/item"
import category from "./scripts/category";
import SingletonStorageManager from "./scripts/boardSingleton";
import SelectBoard from "./components/SelectBoard";
import { useState, useEffect } from "react";

export default function Home() {
	const [items, setItems] = useState([]);
	const [categories, setCategories] = useState([]);
	const [board, setBoard] = useState(null);
	
	useEffect(() =>{
		
		setItems(item.loadObjectsFromStorage());
		setCategories(category.loadObjectsFromStorage());
		setBoard(sessionboard.loadObjectsFromStorage())
		let manager = new SingletonStorageManager();
		manager.addItems(items);
		manager.addCategories(categories);
		manager.setBoard(board);
		
	}, []	
	)
	console.log(items)
	
	return (
		<main className=''>
			<div className="p-8 items-center">
				<Board board={board}>
			
				</Board>
			</div>
			
		</main>
	)
}
