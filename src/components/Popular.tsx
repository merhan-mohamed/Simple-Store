import { MessageCircle, ThumbsUp } from 'lucide-react'


const Popular = () => {
  const Blogs = [{
    title:"My Amazing Blog Title 1",
    author:"Hanan",
    likes:142,
    comments:44
  },
  {
    title:"My Amazing Blog Title 2",
    author:"Dana",
    likes:153,
    comments:25
  },
  {
    title:"My Amazing Blog Title 3",
    author:"Merhan",
    likes:200,
    comments:88
  },
]
  return (
    <div className='bg-white p-5 w-[23rem] mt-4 border ml-5 rounded'>
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {Blogs.map((item, index) => {
          return(
          <li key={index} className='mb-4'>
            <div className='flex justify-between items-center'>
              <span className='font-bold mb-2'>{item.title}</span>
            </div>
            <span className="text-gray-600">
              {`Publish by ${item.author}`}
            </span>
            <div className='flex items-center mt-2'>
              <MessageCircle size={16}/>
              <span className='text-gray-500 mr-5 ml-1'>{item.comments}</span>
              <ThumbsUp size={16}/>
              <span className="text-gray-500 mr-2 ml-2">
                {item.likes}
              </span>
            </div>
          </li>)
        })}
      </ul>
    </div>
  )
}

export default Popular
