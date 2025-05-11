import React, { createContext, ReactNode, useContext, useState } from 'react'


interface FilterContextProps {
  searchquery:string,
  setSearchQuery : (query:string) => void,
  selectedcategory:string,
  setSelectedCategory : (category:string) => void,
  minprice:number | undefined,
  setMinPrice:(price:number | undefined) => void,
  maxprice:number | undefined,
  setMaxPrice:(price: number| undefined) => void,
  keyword:string,
  setKeyWord: (keyword:string) => void

}


const FilterContext = createContext<FilterContextProps| undefined>(undefined)

export const FilterProvider:React.FC<{children:ReactNode}> = ({children}) => {

  const [searchquery , setSearchQuery] = useState<string>('')
  const [selectedcategory, setSelectedCategory] = useState<string>('')
  const [minprice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxprice, setMaxPrice] = useState<number | undefined>(undefined)
  const [keyword, setKeyWord] = useState<any>('')

  return (
    <FilterContext.Provider value={{searchquery,setSearchQuery, selectedcategory,setSelectedCategory,  minprice, setMinPrice, maxprice, setMaxPrice, keyword, setKeyWord}}>

      {children}
      
    </FilterContext.Provider>
  )
}

export const UseFilter = () => {
  const context = useContext(FilterContext)
  if(context === undefined){
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
  
}


