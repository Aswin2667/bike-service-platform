import React from 'react'
import Navbar from '../../layout/navbar/Navbar'
import ProductCard from '../../components/servicecard/ProductCard'
const Services = () => {
  return (
    <div className='flex gap-24 w-screen'>
    <Navbar/>
    <div className=' flex gap-40 h-1/4 items-center'>
    <ProductCard />
    <ProductCard />
    <ProductCard />
    </div>
    </div>
    
  )
}

export default Services