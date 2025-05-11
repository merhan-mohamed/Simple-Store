import { useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


interface Product {
    id: number,
    price: number,
    rating:number,
    description: string,
    images:string[],
    title:string

}

const Product = () => {
    const {id} = useParams<{id:string}>();
    const navigate = useNavigate();
    const [products, setProducts] = useState< Product | null>(null)


    useEffect(() => {
        if(id){
        axios.get(`https://dummyjson.com/products/${id}`).then((response) => {
                setProducts(response.data)
        }).catch(error => {
            console.error("Error Fetching Data", error)
        })
    }
    }, [id])

    if(!products){
      return <h1>Loading.....</h1>
    }
    
  return (
    <div className='p-5 w-[60%]'>
        <button className='mb-5 px-4 py-2 bg-black text-white rounded' onClick={() => navigate(-1)}>
            Back
        </button>

        <img src={products.images[0]} alt={products.title} className='w-[50%] h-auto mb-5' />

        <h1 className="text-2xl mb-4 font-bold">{products.title}</h1>
        <p className="text-gray-700 w-[70%] mb-4">{products.description}</p>
        <div className="flex">
            <p>Price: ${products.price} </p>
            <p className="ml-10">Rating: {products.rating}</p>
        </div>
    </div>
  )
}

export default Product
