import { useEffect, useState } from 'react';
import SingletonStorageManager from '../localStorageScripts/boardSingleton';
class sessionboard {

  static idIncrement = 0;

  constructor({ "_id": id = sessionboard.idIncrement, "_categoriesId": categoriesId = [] }) {
    /**
     * Unfortunately this produces a connacsence of order when retrieving from local storage.
     * Note to properly retrieve, do in this order:
     * 1. Always do initial load static method for every relevant object
     * 2. Load in and convert JSON objects to dictionary representations of objects
     * 3. Pass in dictionary into constructors of sessionboards
     * 
     */
    this._categoriesId = categoriesId;
    this._id = id
    if (id == sessionboard.idIncrement) {
      sessionboard.idIncrement += 1;
    }

  }

  addCategoryId(categoryId) {
    /**
     * Starts at 0
     */
    this._categoriesId.push(categoryId);
  }

  getCategoriesId() {
    return this._categoriesId;
  }

  updateOrSave() {
    /**
     * Edits or adds the contents of this in local storage
     */

    let currSessionboards = JSON.parse(localStorage.getItem("sessionboards"));
    if (currSessionboards) {
      let triggered = false
      for (let i = 0; i < currSessionboards.length; i++) {
        if (currSessionboards[i]["_id"] == this._id) {
          currSessionboards[i] = { "_categoriesId": this._categoriesId, "_id": this._id };
          triggered = True;
          break
        }
      }
      if (!triggered) {
        currSessionboards.push({ "_categoriesId": this._categoriesId, "_id": this._id })
      }

    } else {
      currSessionboards = [{ "_categoriesId": this._categoriesId, "_id": this._id }]
    }
    localStorage.setItem("sessionboards", JSON.stringify(currSessionboards))
    localStorage.setItem("sessionboardIdIncrement", sessionboard.idIncrement)
  }

  static initialLoad() {

    if (!localStorage.getItem("sessionboardIdIncrement")) {
      sessionboard.idIncrement = 0;
    } else {
      sessionboard.idIncrement = JSON.parse(localStorage.getItem("sessionboardIdIncrement"))
    }

  }

  delete() {
    let manager = new SingletonStorageManager();
    delete manager.getBoards()[this._id]
    let items = [];
    for (const categoryId of this._categoriesId) {
      const category = manager.getCategoriesId()[categoryId]
      for (const itemId of category._itemsId) {
        delete manager.getItems()[itemId]
      }
      delete manager.getCategoriesId()[categoryId]
    }
  }

  static loadObjectsFromStorage() {
    let res;

    sessionboard.initialLoad();
    const boards = localStorage.getItem("sessionboards");
    if (!boards) {
      res = [];
    } else {
      const parsedBoards = Object.values(JSON.parse(boards));
      const loadedObjects = parsedBoards.map(boardDict => new sessionboard(boardDict));
      res = loadedObjects;
    }


    return res;
  }

}



export default sessionboard;