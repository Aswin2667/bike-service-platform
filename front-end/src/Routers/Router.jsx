import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Services from '../pages/services/Services';
import Cart from '../pages/mycart/Cart';
import Profile from '../pages/profile/Profile';
import PageNotFound from '../pages/404/PageNotFound';
import Chat from '../pages/chat/Chat';
import AllBookings from '../pages/allbookings/AllBookings';
import MyBookings from '../pages/mybookings/MyBookings';
import { useSelector } from 'react-redux';
Services
const Router = () => {

  const isAuthenticated = useSelector((state) => state.Authenticated.value); // Assuming you have your Redux state set up properly
  const renderAuthenticatedRoute = (element) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };
  return (
    <div className="h-screen bg-grey-900">
        <Routes>
          <Route path="/home" element={renderAuthenticatedRoute(<Home />)} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Services" element={renderAuthenticatedRoute(<Services />)} />
          <Route path="/cart" element={renderAuthenticatedRoute(<Cart/>)}/>
          <Route path="/chat" element={renderAuthenticatedRoute(<Chat />)}/>
          <Route path="/Orders" element={renderAuthenticatedRoute(<MyBookings />)}/>
          <Route path="/profile" element={renderAuthenticatedRoute(<Profile />)} />
          <Route path="/Bookings" element={renderAuthenticatedRoute(<AllBookings />)} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
    </div>
  )
}

export default Router