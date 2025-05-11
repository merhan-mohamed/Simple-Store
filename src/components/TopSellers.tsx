import { useEffect, useState } from 'react'

interface Author {
    name:string,
    isFollowing: boolean,
    image:string

}

const TopSellers = () => {

    const[authors, setAuthors] = useState<Author[]>([])

    const handleClick = (index:number) => {
        setAuthors((prev) => prev.map((item, i) => (
            i === index ? {...item, isFollowing : !item.isFollowing} : item
        )))
    }

    useEffect(() => {
      const fetchData = async() => {
        try{

            const response = await fetch("https://randomuser.me/api/?results=5")
            const data= await response.json()
            console.log("TOP" ,data)

            const authorsData = data.results.map((user:any) => (
                {
                    name: `${user.name.first} ${user.name.last}`,
                    image: `${user.picture.medium}`,
                    isFollowing: false
                }
            ))
            setAuthors(authorsData)

        }catch(error){
            console.error(`Fetching Data Error : ${error}`)
        }
      }

      fetchData()
    }, [])
    
  return (
    <div className='bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded'>
      <h2 className="text-xl font-bold mb-5 ">Top Sellers</h2>

      <ul>
        {authors.map((item, index) => (
       
                <li key={index} className='flex items-center justify-between mb-4'>
                <section className='flex justify-center items-center'>
                    <img src={item.image} alt={item.name}  className='w-[25%] h-[25%] justify-center rounded-full'/>

                    <span className='ml-4'>{item.name}</span>
                </section>

                <button onClick={() => handleClick(index)} className={`py-1 px-3 rounded ${item.isFollowing ? "bg-red-500 text-white" : "bg-black text-white"}`}>{item.isFollowing ? "unFollow" : "Follow"}</button>
                </li>
        
        ))}</ul>
    </div>
  )
}

export default TopSellers
