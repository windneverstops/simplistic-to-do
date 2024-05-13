import { useEffect, useState} from 'react';

class category{

    static idIncrement = 0;

    constructor({"_title":title = "untitled","_itemsId":itemsId = [],"_id":id = category.idIncrement}){
        this._title = title;
        this._id = id;
        this._itemsId = itemsId;
        if (id == category.idIncrement){
            category.idIncrement += 1;
        }
       
    }

    addItemId(itemId){
        this._itemsId.push(itemId);
    }

    getItemsId(){
        return this._itemsId;
    }

    getId(){
        return this._id
    }

    getTitle(){
        return this._title
    }

    setTitle(title){
        this._title = title
    }

    updateOrSave(){
        /**
         * Edits or adds the contents of this in local storage
         */
        let currCategories = JSON.parse(localStorage.getItem("categories"));
        if (currCategories){
            let triggered = false
            for (let i = 0; i < currCategories.length; i++){
                if (currCategories[i]["_id"] == this._id){
                    currCategories[i] = {"_title":this._title,"_itemsId":this._itemsId,"_id":this._id};
                    triggered = True;
                    break
                }
            }
            if (!triggered){
                currCategories.push({"_title":this._title,"_itemsId":this._itemsId,"_id":this._id})
            }
            
        }else{
            currCategories = [{"_title":this._title,"_itemsId":this._itemsId,"_id":this._id}]
        }
        localStorage.setItem("categories",JSON.stringify(currCategories))
        localStorage.setItem("categoryIdIncrement",category.idIncrement)
    }

    delete(){    
        /**
         * Deletes from singleton's storage
         * Make sure to update the storage
         */
        let manager = new SingletonStorageManager();
        
        for (const board of Object.values(manager.getBoards())){
            let done = false;
            for (let i = 0; i < board.getCategoriesId().length; i++){
                if (board.getCategoriesId()[i] == this._id){
                    board.getCategoriesId().splice(i,1)
                    done = True;
                    break;
                }
            }  
            if (done){
                break;
            }   
        }
        delete manager.getCategories()[this._id]
        
    }


    static initialLoad(){

        if (!localStorage.getItem("categoryIdIncrement")){
            category.idIncrement = 0;
        }else{
            category.idIncrement = JSON.parse(localStorage.getItem("categoryIdIncrement"))
        }
      
    }

    static loadObjectsFromStorage() {
    
        category.initialLoad();
        let categoryPre = JSON.parse(localStorage.getItem("categories"));
        if(categoryPre == null){
            return []
        }
        return Object.values(categoryPre).map(categoryDict => new category(categoryDict));
        
    }
}




export default category;
