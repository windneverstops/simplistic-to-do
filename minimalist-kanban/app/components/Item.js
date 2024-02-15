const Item = ({item}) =>{
    return (
        <div className="flex flex-col mx-0 pb-0.5 gap-2 p-2 text-inherit  container mx-auto overflow-hidden min-w-[200px] max-w-[300px] border-solid border-2 hover:border-dotted rounded">
            <div className="text-xl font-bold text-sm text-center">
                {item.title}
            </div>
            <div className="text-xs">
                {item.description}
            </div>
        </div>
        
    )
}
export default Item;