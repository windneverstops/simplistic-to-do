import item from "./item";
import category from "./category";
import sessionboard from "./sessionboard";
class manager {
    constructor() {
        this._sessionboard = null;
        this._categories = {};
        this._items = {};
    }

    getBoard() {
        return this._sessionboard;
    }

    
    setBoard(board) {
        this._sessionboard = board;
        
    }
    
    addCategory(categories){
        this._categories[categories.getId()] = categories;
    }
    
    addCategories(categories){
        for (const category of categories){
            this._categories[category.getId()] = category
        }
    }

    getCategories(){
        return this._categories;
    }

    getCategory(id){
        return this._categories[id];
    }

    addItem(item){
        this._items[item.getId()] = item

    }

    addItems(items){
        for (const item of items){
            this._items[item.getId()] = item
        }
    }

    getItems(){
        return this._items
    }

    getItem(id){
        return this._items[id]
    }

    uploadToStorage(){
        localStorage.setItem("categories",JSON.stringify(this._categories))
        localStorage.setItem("categoryIdIncrement",category.idIncrement)
        localStorage.setItem("items",JSON.stringify(this._items))
        localStorage.setItem("itemIdIncrement",item.idIncrement)
        localStorage.setItem("sessionboard",JSON.stringify(this._sessionboard))
    }

}
let singletonInstance = null;

export default class SingletonStorageManager {
    constructor() {

        if (!singletonInstance) {
            singletonInstance= new manager();
        }
      
        return singletonInstance;
    }
}
