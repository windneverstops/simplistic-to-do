import item from "../classes/item";
import category from "../classes/category";
import sessionboard from "../classes/sessionboard";
class manager {
  constructor() {
    this._sessionboards = {};
    this._categories = {};
    this._items = {};
  }

  getBoard(id) {
    return this._sessionboards[id];
  }

  getBoards() {
    return this._sessionboards;
  }

  addBoard(board) {
    this._sessionboards[board.getId()] = board;

  }

  addBoards(boards) {
    for (const board of boards) {
      this._sessionboards[board.getId()] = board
    }
  }

  replaceCategoriesWith(categories) {
    this._categories = {}
    this.addCategories(categories)
  }

  addCategory(categories) {
    this._categories[categories.getId()] = categories;
  }

  addCategories(categories) {
    for (const category of categories) {
      this._categories[category.getId()] = category
    }
  }

  getCategories() {
    return this._categories;
  }

  getCategory(id) {
    return this._categories[id];
  }

  addItem(item) {
    this._items[item.getId()] = item

  }

  addItems(items) {
    for (const item of items) {
      this._items[item.getId()] = item
    }
  }

  getItems() {
    return this._items
  }

  getItem(id) {
    return this._items[id]
  }

  uploadToStorage() {

    localStorage.setItem("categories", JSON.stringify(this._categories))
    if (Object.keys(this._categories).length === 0) {
      localStorage.setItem("categoryIdIncrement", 0)
    } else {
      localStorage.setItem("categoryIdIncrement", category.idIncrement)
    }

    localStorage.setItem("items", JSON.stringify(this._items))
    if (Object.keys(this._items).length === 0) {
      localStorage.setItem("itemIdIncrement", 0)
    } else {
      localStorage.setItem("itemIdIncrement", item.idIncrement)
    }

    localStorage.setItem("sessionboards", JSON.stringify(this._sessionboards))
    if (Object.keys(this._sessionboards).length === 0) {
      localStorage.setItem("sessionboardIdIncrement", 0)
    } else {
      localStorage.setItem("sessionboardIdIncrement", sessionboard.idIncrement)
    }

  }

  clearStorage() {
    this._categories = {};
    this._items = {};
    this._sessionboards = {};
    this.uploadToStorage();
  }


}
let singletonInstance = null;

export default class SingletonStorageManager {
  constructor() {

    if (!singletonInstance) {
      singletonInstance = new manager();
    }

    return singletonInstance;
  }
}
