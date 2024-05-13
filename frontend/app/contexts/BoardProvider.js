import React, { createContext, useState, useContext, useEffect } from 'react';


const BoardDataContext = createContext()

export const useBoardDataContext = () =>{
  return useContext(BoardDataContext)
}

const BoardProvider = ( { children }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

	useEffect(() => {
		/**
		 * Board may be implemented in the future but for now it's not an intended feature
		 */

		const fetchData = async () => {
			const dataPromise = JSON.parse(await localStorage.getItem("data"));
      
      if (dataPromise){
        setData(dataPromise)
      }else{
        setData([{"name": "First board", "categories": []}])
      }
      
			setLoading(false)

		}

		fetchData()
	}, []
	)

  const updateData = (newData) =>{
    localStorage.setItem("data", JSON.stringify(newData))
    setData(newData)
  }

  const clearBoardData = (boardIndex) =>{
    data[boardIndex].categories = []
    updateData([...data])
  }

  return (
    <BoardDataContext.Provider
      value = {{
        updateData,
        data,
        loading,
        clearBoardData
      }}>
      {children}
    </BoardDataContext.Provider>
  )
}

export default BoardProvider