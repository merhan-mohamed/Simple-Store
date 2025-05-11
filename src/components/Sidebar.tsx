import {useEffect, useState} from 'react';
import { UseFilter } from '../Context';



interface product {
    category: string
}

interface DataResponse {
    products: product[]
}

const Sidebar = () => {

    const {searchquery,setSearchQuery, selectedcategory,setSelectedCategory,  minprice, setMinPrice, maxprice, setMaxPrice, setKeyWord} = UseFilter()
  const [categories, setCategories] = useState<string[]>([])

  const [keywords] = useState<string[]>(["apple" ,"shirt", "shoes", "trend", "fashion", "watch"])

  const HandleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined)
  }

  const HandleMaxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice( value ? parseFloat(value) : undefined)

  }

  const HandleRadioInputChange = (category:string) => {
      setSelectedCategory(category)
  }

 const HandleKeyword = (keyword:string) => {
    setKeyWord(keyword)
 }

 const HandleReset = () => {
   setSearchQuery("")
   setMinPrice(undefined),
   setMaxPrice(undefined),
   setSelectedCategory('')
   setKeyWord("")


 }


  useEffect(() => {
     const FetchData = async() => {
      try {

       const response = await fetch("https://dummyjson.com/products")
       const data:DataResponse = await response.json()
       console.log("data" , data)
       const UniqueCategory = Array.from(new Set(data.products.map((prod) => prod.category)))

       console.log(UniqueCategory)
       setCategories(UniqueCategory)
      
      } catch (error) {
        console.error("Error Fetching Product", error)
      }
    }
  
    FetchData()
  }, [])
  

  return (
    <div className='w-64 p-5 h-screen'>
        <h1 className="text-2xl font-bold mb-10 mt-4">
            React Store
        </h1>

<section>
        <section className='w-44' >
            <input type="text" placeholder='Search Product...' className='border-2 rounded px-2 py-3 w-full sm:mb-0' value={searchquery} onChange={(e) => setSearchQuery(e.target.value)}/>

            <div className="flex justify-center items-center mt-3">
                <input type="text"  placeholder='Min' className='border-2 mr-2 px-5 py-3 mb-3 w-full' value={minprice ?? ""} 
                onChange={HandleMinChange}/>
                <input type="text"  placeholder='Max' className='border-2 mr-2 px-5 py-3 mb-3 w-full' value={maxprice ?? ""}  onChange={HandleMaxChange}/>
            </div>

            {/*Categories Section*/}
            <div className="mb-2">
                <h2 className="font-semibold mb-3 text-xl">Categories</h2>

                {categories.map((category, index) => (
                    <label key={index} className='block mb-2'>
                        <input type="radio" value={category} name='category' className='mr-2 w-[16px] h-[16px]' 
                        onChange={() => HandleRadioInputChange(category)}
                        checked={selectedcategory === category}
                        />
                        {category.toUpperCase()}
                    </label>
                ))}
            </div>
        </section>

        {/*Keywords Section*/}
        <div className="mb-5 mt-4">
        <h2 className='font-semibold mb-3 text-xl'>KeyWords </h2>
        <div>
            {keywords.map((keyword, index) => (
                <button key={index} className='block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200' onClick={() => HandleKeyword(keyword)} >{keyword.toUpperCase()}</button>
            ))}
        </div>
        </div>

        <button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5" onClick={HandleReset}> Reset Filters</button>
</section>
    
    </div>
  )
}

export default Sidebar
