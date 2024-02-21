import React from 'react';
import 'tailwindcss/tailwind.css';

import {useDraggable} from '@dnd-kit/core';
import Item from './Item';


export function DraggableCard({itemId, itemsId, setItemsId}){

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: itemId,
    });

    const style = transform ? {
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,

        
    } : undefined;


    return (
        <div ref={setNodeRef}  {...listeners} id={itemId}   {...attributes} style={style}>    
            <Item itemId = {itemId} itemsId = {itemsId} setItemsId = {setItemsId}>

            </Item>

        </div>
            
      
        
        
       
    )
} 

