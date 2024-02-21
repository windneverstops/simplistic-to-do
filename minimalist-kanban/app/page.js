"use client";
import Board from "./components/Board"
import item from "./scripts/item"
import category from "./scripts/category";
import SingletonStorageManager from "./scripts/boardSingleton";
import { useState, useEffect } from "react";

// Add keyboard shortcuts to make this even better
// Add colour/theme selector
// Add help popup modal for keyboard shortcuts



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
			return
		}
		let manager = new SingletonStorageManager();
		manager.addItems(items);
		manager.addCategories(categories);
		
	}, [categories,items, loading]	
	)
	
	
	return (
		<main className='h-screen p-6 pt-12'>
			
			<Board existingCategories  = {categories} loading = {loading}>

			</Board>
			
			
		</main>
	)
}
