import React from 'react'
import Navbar from '../../layout/navbar/Navbar'
import WaveAnimation from '../../components/home_BG/WaveAnimation'

const Home = () => {
  return (
    <div className='flex  '>
        <div className='z-40 flex'>
        <Navbar/>
        <div >

        </div>
        </div>
        <WaveAnimation />
      </div>  
  )
}

export default Home