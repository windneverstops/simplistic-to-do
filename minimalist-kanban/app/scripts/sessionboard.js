import { useEffect, useState} from 'react';
import SingletonStorageManager from './boardSingleton';
class sessionboard{


    constructor({"_categoriesId": categoriesId = []}){
        /**
         * Unfortunately this produces a connacsence of order when retrieving from local storage.
         * Note to properly retrieve, do in this order:
         * 1. Always do initial load static method for every relevant object
         * 2. Load in and convert JSON objects to dictionary representations of objects
         * 3. Pass in dictionary into constructors of sessionboards
         * 
         */
        this._categoriesId = categoriesId !== null ? categoriesId : [];
        
    }

    addCategoryId(categoryId){
        /**
         * Starts at 0
         */
        this._categoriesId.push(categoryId);
    }

    getCategoriesId(){
        return this._categoriesId;
    }

    updateOrSave(){
        /**
         * Edits or adds the contents of this in local storage
         */     
        localStorage.setItem("sessionboard",JSON.stringify({"_categoriesId": this._categoriesId}))
   
    }

    delete(){
        let manager = new SingletonStorageManager();
        delete manager.setBoard(null);
    }

    static loadObjectsFromStorage() {
        if (JSON.parse(localStorage.getItem("sessionboard")) == null){
            return new sessionboard({});
        }else{
            return new sessionboard(JSON.parse(localStorage.getItem("sessionboard")))
        }
        
    }
    
}



export default sessionboard;