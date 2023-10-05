import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Services from '../pages/services/Services';
import Bookings from '../pages/bookings/Bookings';
import Profile from '../pages/profile/Profile';
import PageNotFound from '../pages/404/PageNotFound';
import Chat from '../pages/chat/Chat';
Services
const Router = () => {
  return (
    <div className="h-screen bg-grey-900">
      
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Services" element={<Services />} />
          <Route path="bookings" element={<Bookings/>}/>
          <Route path="/chat" element={<Chat />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
    </div>
  )
}

export default Router