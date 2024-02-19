import Item from "./Item";
import Button from "./Button";

const Category = ({key, children}) =>{
    return (
        <>  
            <kbd className=" flex flex-col min-h-[90vh] min-w-[200px] max-w-[250px] m-1">
               
                <span className="text-center text-xl font-bold text-black">
                TEST
                </span>
                     
              
                <div className="border border-1 rounded border-red-400 bg-white"> 
                    
                {children}
                    
                    
                </div>
                
                <button className="text-3xl">+</button>
            </kbd>
            
        </>
        
    )
}
export default Category;