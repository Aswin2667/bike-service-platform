import React from 'react'
import Navbar from '../../layout/navbar/Navbar'
import ChatWindow from '../../components/chatwindow/ChatWindow'
const Chat = () => {
  return (
        <div className='flex gap-5 w-screen'>
        <Navbar/>
        <div className='w-4rem w-screen'>
          <ChatWindow />
        </div>
        </div>
    
  )
}
export default Chat