import Item from "./Item";
import Button from "./Button";
const Category = ({category}) =>{
    return (
        <>  
            <div className="overflow-y-scroll flex flex-col ">
                <div className="text-center text-xl font-bold max-w-[250px]">
                    {category.title}  
                </div>
                <div className="border border-2 "> 
                    
                    {
                        category.getItems().map((item) => {
                                return (
                                    <Item item = {item} key = {item.id}>

                                    </Item>
                                )
                            }
                        )
                    }
                
                    
                    
                </div>
                <button className="text-3xl">+</button>
            </div>
            
        </>
        
    )
}
export default Category;