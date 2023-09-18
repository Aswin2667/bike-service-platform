import './App.css'
import Navbar from './components/Navbar'
import PageNotFound from './404/PageNotFound'
import { Route ,Routes} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
function App() {
  return (
    <div className='h-screen bg-grey-900'>
    <Routes>
      <Route path='/home' element={<Navbar/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/*' element={<PageNotFound />}/>
    </Routes>
    </div>
  )
}
export default App