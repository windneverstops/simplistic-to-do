import { useState, useEffect, useRef } from "react";
import category from "../scripts/classes/category";
import SingletonStorageManager from "../scripts/localStorageScripts/boardSingleton";
import { BarLoader } from "react-spinners";
import Key from "./Key";
import { DragDropContext } from "@hello-pangea/dnd";
import Category from "./Category";
import "../styles/scroll.css"
import React from "react";
import { useBoardDataContext } from "../contexts/BoardProvider";

const Board = ({ boardIndex }) => {

  // Data
  const [categories, setCategories] = useState([]);
  const { data, updateData, clearBoardData, loading } = useBoardDataContext();

  // Component states
  const [showInput, setShowInput] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  // Refs
  const inputRef = useRef(null);
  const clearRef = useRef(null);

  // Initial loading for existingCategories
  useEffect(() => {
    if (data.length > 0){
      setCategories(data[boardIndex].categories)
    }

  }, [data])
  // Handling inputs and its logic
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleInputBlur = () => {
    setShowInput(false);
  };

  const addCategory = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (e) => {

    const { value } = e.target;

    if (e.key === 'Enter') {
      const newCategory = { "title": value.trim(), "tasks": []}
      const newData = [...data]
      newData[boardIndex].categories.unshift(newCategory)
      updateData(newData)
      setShowInput(false);
      e.target.value = ''; // Clear the input field after adding the category
    } else if (e.key === "Escape") {
      setShowInput(false);
    }

  };

  // For deleting a category

  const handleCancelDelete = () => {
    setShowDelete(false);
  }

  const handleRemoveCategory = () => {
    setShowDelete(!showDelete);
  }

  const confirmRemoveCategory = () => {
    data[boardIndex].categories.pop()
    updateData([...data])
    setShowDelete(false);
  }

  // Handling drag

  const onDragEnd = (e) => {

    if (e.destination == null) {
      return
    }

    const sourceCategoryIndex = parseInt(e.source.droppableId)
    const destinationCategoryIndex = parseInt(e.destination.droppableId)
    const itemIndex = e.draggableId.split(',').map(Number)[-1]
    const item = data[boardIndex].categories[sourceCategoryIndex].tasks[itemIndex]

    data[boardIndex].categories[sourceCategoryIndex].tasks.splice(itemIndex, 1)
    data[boardIndex].categories[destinationCategoryIndex].tasks.push(item)

    updateData([...data])
  }

  // For clearing the local storage

  const handleClearClick = () => {
    if (confirmClear) {
      // Button
      setConfirmClear(false);
      clearBoardData(boardIndex)
    } else {
      setConfirmClear(true);
    }
  };

  const handleOutsideClickForClear = (event) => {
    if (confirmClear && !clearRef.current.contains(event.target)) {
      setConfirmClear(false);
    }
  };

  useEffect(() => {
    if (confirmClear) {
      document.addEventListener("click", handleOutsideClickForClear);
    } else {
      document.removeEventListener("click", handleOutsideClickForClear);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClickForClear);
    };
  }, [confirmClear, handleOutsideClickForClear]);


  return (
  
    
    (loading) ?
      <div className="flex items-center justify-center h-screen">
        <BarLoader
          color="#000000"
          height={10}
          width={200}
        />
      </div>
      :
      // New category input
      (
        showInput ?
          <div className="flex items-center justify-center h-screen">
            <kbd className="flex flex-col items-center">
              <input
                className="text-center whitespace-normal m-4 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                type="text"
                placeholder="untitled"
                ref={inputRef}
                onKeyDown={handleInputChange}
                onBlur={handleInputBlur}
              />
              <p>
                <Key>Enter</Key> - to submit title
              </p>
              <p className="m-4">
                <Key>Esc</Key> - to go back
              </p>
            </kbd>
          </div>
          :
          (showDelete ? <div className="flex items-center justify-center h-full">
            <kbd className="flex flex-col items-center text-red-500 text-bold text-2xl">
              <p className="py-6 sm: px-6 hyphens-auto">
                Are you sure you want to delete the right-most category?
              </p>

              <div className="md:space-x-20 text-center flex flex-col sm:flex-row">
                <button className="border border-2 border-red-400 bg-red-400 text-white rounded p-2 my-4" onClick={confirmRemoveCategory}>
                  Yes, delete category
                </button>
                <button className="border border-4 border-white text-white rounded p-2 my-4" onClick={handleCancelDelete}>
                  No, don&apos;t delete category
                </button>
              </div>
            </kbd>
          </div>
            :
            <div className="flex flex-col h-full">
              <div className="overflow-y-hidden h-full">
                <div className="flex flex-row justify-center items-center h-full">
                  <button
                    className="p-4"
                    onClick={addCategory}
                  >
                    <div className='items-center text-7xl p-4 transition duration-300 hover:text-white'>
                      +
                    </div>

                  </button>
                  {!categories.length &&
                    <div className="flex flex-row w-screen h-full items-center justify-center">
                      <p>No categories</p>
                    </div>
                  }
                  {categories.length > 0 &&
                    <div className="flex flex-row w-full h-full overflow-x-auto scroll gap-x-6">
                      <DragDropContext onDragEnd={onDragEnd}>
                        {
                          categories.map((category, index) => {

                            return (
                              <Category key = { index } category = { category } categoryIndex = { index } boardIndex = { boardIndex }/>
                            )
                          })
                        }
                      </DragDropContext>
                    </div>}
                  <button
                    className="p-4"
                    onClick={handleRemoveCategory}
                  >
                    <div className='items-center text-7xl p-4 hover:text-white transition transition-300'>
                      -
                    </div>
                  </button>
                </div>
              </div>
              <div className="text-center m-2 font-bold">
                <button ref={clearRef} onClick={handleClearClick}><Key>{confirmClear ? "Are you sure?" : "Clear"}</Key></button>
              </div>
              <div className="text-center text-gray-400 select-none">
                <p className="whitespace-wrap">
                  Adds categories to the left, removes categories from the right. Categories and items are draggable. @windneverstop on github
                </p>
              </div>

            </div>)
      )
    
  );
};

export default Board;
