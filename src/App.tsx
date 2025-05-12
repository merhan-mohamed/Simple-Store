import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Product from './components/Product'
import TopSellers from './components/TopSellers'
import Popular from './components/Popular'

const App = () => {
  return (
    <Router basename='/Simple-Store/'>
    <div className='flex h-screen'>
      <Sidebar/>
      <div className='rounded w-full flex justify-center flex-wrap'>
        <Routes>
          <Route path='/' element={<MainContent/>}/>
          <Route path="/product/:id" element={<Product/>}/>
        </Routes>
      </div>

      <div className=''>
          <TopSellers/>
          <Popular/>
        </div>
    </div>
    </Router>
  )
}

export default App
