import React from 'react'
import Navbar from '../../Navbar'
import WaveAnimation from '../../Background/WaveAnimation'

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