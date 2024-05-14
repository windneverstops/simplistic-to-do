"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Board from "./components/Board"
import BoardProvider from "./contexts/BoardProvider";

// Add keyboard shortcuts to make this even better
// Add colour/theme selector
// Add help popup modal for keyboard shortcuts


export default function Home() {

	return (
		<main className='grow'>
			
	
					<BoardProvider>
						<Board boardIndex = {0}/>
					</BoardProvider>
			
			
		</main>
	)
}
