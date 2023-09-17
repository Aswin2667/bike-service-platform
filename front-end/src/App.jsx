import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import PageNotFound from './404/PageNotFound'
import { Route ,Routes} from 'react-router-dom'
function App() {
  return (
    <div className='h-screen bg-grey-900'>
    <Routes>
      <Route path='/navbar' element={<Navbar/>}/>
      <Route path='/*' element={<PageNotFound />}/>
    </Routes>
    </div>
  )
}
export default App