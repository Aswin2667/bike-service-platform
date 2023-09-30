import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Services from '../pages/services/Services';
import Bookings from '../pages/bookings/Bookings';
import Settings from '../pages/settings/Settings';
import PageNotFound from '../pages/404/PageNotFound';
import Chat from '../pages/chat/Chat';

Services
const Router = () => {
  return (
    <div className="h-screen bg-grey-900">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Services" element={<Services />} />
          <Route path="bookings" element={<Bookings/>}/>
          <Route path="/chat" element={<Chat />}/>
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router