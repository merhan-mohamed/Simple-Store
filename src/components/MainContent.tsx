import { useEffect, useState } from 'react'
import { UseFilter } from '../Context'
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContent = () => {
    const { searchquery,selectedcategory, minprice, maxprice, keyword} = UseFilter();
    const [product, setProduct] = useState<any[]>([])
    const [filters, setFilters] = useState('all ')
    const [currentpage, setCurrentPage] = useState(1)
    const [dropdownOpen, setDropDownOpen] = useState(false)
    const ItemsPerPage = 12


    {/* products by using fetch*/}
    useEffect(() => {
       
        let url = `https://dummyjson.com/products?limit=${ItemsPerPage}&skip=${(currentpage - 1) * ItemsPerPage}`

        if(keyword){
          url = `https://dummyjson.com/products/search?q=${keyword}`
        }

        axios.get(url).then(Response => {
            setProduct(Response.data.products)
        })
    
     } , [currentpage, keyword]
    )

    {/*----Filtered Section-----*/}

    const getFilteredItem = () => {
        let FilteredProducts = product
        if(selectedcategory){
            FilteredProducts = FilteredProducts.filter(product => product.category === selectedcategory)
        }

        if(minprice !== undefined){
            FilteredProducts = FilteredProducts.filter(item => item.price >= minprice)
        }

        if(maxprice !== undefined){
            FilteredProducts = FilteredProducts.filter(item => item.price <= maxprice)
        }
       
        if(searchquery){
            FilteredProducts = FilteredProducts.filter(item => item.title.toLowerCase().includes(searchquery.toLowerCase()))
        }

        switch(filters){
            case "Expensive":
                return FilteredProducts.sort((a,b) => b.price - a.price )
            case "Cheap" :
                return FilteredProducts.sort((a,b) => a.price - b.price)
            case "Popular" : 
            return FilteredProducts.sort((a,b) => b.rating - a.rating)
            default:
                return FilteredProducts
        }
    }
    const FilteredItems =  getFilteredItem()
    console.log("fl", FilteredItems.length)

    {/*Pagnation*/}
    const totalProducts = 100;
    console.log("tl", totalProducts)
    const totalPages = Math.ceil(totalProducts/ItemsPerPage)
    const handlePageChange = (page:number) => {
        if((page > 0 ) && (page <= totalPages)){
            setCurrentPage(page)
        }
    }

    {/*buttons of numbers*/}
    const GetNumbers = () => {
        const buttons:number[] = []
        let Start = Math.max(1, currentpage - 2)
        let End = Math.min(totalPages, currentpage + 2)
        if(currentpage - 2 < 1){
            End = Math.min(totalPages, End + (2- currentpage -1))
        }
        if(currentpage + 2 > totalPages){
            Start = Math.min(1, Start - (2- (totalPages - currentpage)))
        }

        for(let page = Start; page <= End ; page++ ){
            buttons.push(page)
        }

        return buttons

    }


  
    return (
    <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="relative mb-5">
                <button className='border px-4 py-2 rounded-full flex items-center' onClick={() => setDropDownOpen(!dropdownOpen)}>
                    <Tally3 className=''/>
                    {filters === "all" ? "Filter" :
                    filters.charAt(0).toUpperCase() + filters.slice(1)}
                </button>

                {dropdownOpen && (
                    <div className='absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40'>
                        <button className='block px-4 py-2 w-full text-left hover:bg-gray-200' onClick={() => setFilters('Cheap')}>Cheap</button>

                        <button className='block px-4 py-2 w-full text-left hover:bg-gray-200' onClick={() => setFilters('Expensive')}>Expensive</button>

                        <button className='block px-4 py-2 w-full text-left hover:bg-gray-200' onClick={() => setFilters('Popular')}>Popular</button>

                    </div>
                )}

            </div>
        </div>

        
        {/*------ BookCard ------*/}
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {FilteredItems.map((item) => (
                 <BookCard key={item.id} title={item.title} id={item.id} 
                 price={item.price} image={item.thumbnail}/>
            ))}
          
        </div>

        {/*Pagnation*/}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
             {/*Previous*/}

          
             <button onClick={()=> handlePageChange(currentpage - 1 )} className="border px-4 py-2 mx-2 rounded-full"
                disabled={currentpage === 1}>
                Previous
             </button>
            


             {/*Serial Of Numbers*/}
             {(FilteredItems.length) >= 12 && 
             <div className="flex flex-wrap justify-center">
                {GetNumbers().map((page) => (
                    <button key={page} onClick={()=> handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${page === currentpage ? "bg-black text-white"   :  ''} `}>
                        {page}
                    </button>
                ))}
             </div>
            }

             {/*Next*/}
             <button className="border px-4 py-2 mx-2 rounded-full" disabled={currentpage === totalPages}  onClick={()=> handlePageChange(currentpage + 1 )}>
                Next
             </button>

        </div>
       
      </div>
    </section>
  )
}

export default MainContent
