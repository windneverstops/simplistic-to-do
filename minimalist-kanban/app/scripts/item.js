import SingletonStorageManager from "./boardSingleton";
class item{

    static idIncrement = 0;

    constructor({"_title":title = "untitled","_description":description = "","_id":id = item.idIncrement}){
        this._title = title;
        this._description = description;
        this._id = id;
        if (id == item.idIncrement){
            item.idIncrement += 1;
        }
        
    }

    getId(){
        return this._id;
    }

    getTitle(){
        return this._title;
    }

    setTitle(title){
        this._title = title;
    }

    getDescription(){
        return this._description;
    }

    setDescription(description){
        this._description = description;
    }

    updateOrSave(){
        /**
         * Edits or adds the contents of this in local storage
         */
        let currItems = JSON.parse(localStorage.getItem("items"));
        if (currItems){
            let triggered = false
            for (let i = 0; i < currItems.length; i++){
                if (currItems[i]["_id"] == this._id){
                    currItems[i] = {"_title":this._title,"_description":this._description,"_id":this._id};
                    triggered = True;
                    break
                }
            }
            if (!triggered){
                currItems.push({"_title":this._title,"_description":this._description,"_id":this._id})
            }
            
            
        }else{
            currItems = [{"_title":this._title,"_description":this._description,"_id":this._id}]
        }
        localStorage.setItem("items",JSON.stringify(currItems))
        localStorage.setItem("itemIdIncrement",item.idIncrement)
    }

    delete(){
        /**
         * 
         */
        let manager = new SingletonStorageManager();
        
        for (const category of Object.values(manager.getCategories())){
            let done = false;
            for (let i = 0; i < category.getItemsId().length; i++){
                if (category.getItemsId()[i] == this._id){
                    category.getItemsId().splice(i,1)
                    done = true;
                    break;
                }
            }  
            if (done){
                break;
            }   
        }
        delete manager.getItems()[this._id]
    }

    static initialLoad(){
    
        if (!localStorage.getItem("itemIdIncrement")){
            item.idIncrement = 0;
        }else{
            item.idIncrement = JSON.parse(localStorage.getItem("itemIdIncrement"))
        }
    
    }

    static loadObjectsFromStorage() {
       
        item.initialLoad();
        let itemPre = JSON.parse(localStorage.getItem("items"));
        if (itemPre == null){
            return []
        }
        return Object.values(itemPre).map(itemDict => new item(itemDict));
    }

}




export default item;