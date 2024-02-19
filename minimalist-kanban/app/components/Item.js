import SingletonStorageManager from "../scripts/boardSingleton";

const Item = ({itemId}) =>{
    
    const item = new SingletonStorageManager().getItem(itemId)  
    console.log(item.getTitle())
    console.log(item.getDescription())
    return (
        <div className="child flex flex-col p-2">
            <div className="text-xl font-bold text-sm text-center whitespace-pre-wrap hyphens-auto" lang="en">
                {item.getTitle()}
            </div>
            <div className="text-sm text-center whitespace-pre-wrap hyphens-auto" lang="en">
                {item.getDescription()}
            </div>
            
        </div>
        
    )
}
export default Item;