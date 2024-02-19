"use client";
import Board from "./components/Board"
import sessionboard from "./scripts/sessionboard"
import item from "./scripts/item"
import category from "./scripts/category";
import SingletonStorageManager from "./scripts/boardSingleton";
import { useState, useEffect } from "react";


export default function Home() {
	const [items, setItems] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);


	
	useEffect(() =>{
		/**
		 * Board may be implemented in the future but for now it's not an intended feature
		 */
		
		if (loading){
			setItems(item.loadObjectsFromStorage());
			setCategories(category.loadObjectsFromStorage());
			setLoading(false)
		}
		let manager = new SingletonStorageManager();
		manager.addItems(items);
		manager.addCategories(categories);
		
	}, [categories,items]	
	)
	
	
	return (
		<main className=''>
			<div className="items-center">
				<Board existingCategories  = {categories} loading = {loading}>

				</Board>
			</div>
			
		</main>
	)
}
