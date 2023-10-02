import React, { useEffect, useState } from "react";
import Navbar from "../../layout/navbar/Navbar";
import WaveAnimation from "../../components/home_BG/WaveAnimation";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../../services/userservice/UserService";
import { updateUser } from "../../slices/User";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.Authenticated.value);
  const token = useSelector((state) => state.Token.value);
  const User = useSelector((state) => state.user.user);
  const navigate =useNavigate();
  useEffect(() => {
    if(isAuthenticated){
    UserService.authUser(token).then((res) => {
      dispatch(updateUser(res.data.user));
    });
  }else{
    navigate("/");
  }
  }, []);
  return (
    <div className="flex gap-5 w-screen">
      {isAuthenticated && (
        <>
          <div className="z-40 flex gap-6">
            <Navbar />
            <h1 className="text-white text-xl">welcome {User.username}</h1>
          </div>
          <WaveAnimation />
        </>
      )}
    </div>
  );
};

export default Home;
