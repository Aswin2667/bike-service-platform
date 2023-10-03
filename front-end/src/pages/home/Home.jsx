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
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      UserService.authUser(token).then((res) => {
        dispatch(updateUser(res.data.user));
      });
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex gap-5 w-screen">
      {isAuthenticated && (
        <>
          <div className="z-40 flex gap-24 w-screen ">
            <div>
            <Navbar />
            </div>
              <div className=" pt-24 md:pt-36 w-screen mx-auto flex flex-wrap h-1/2 md:flex-row items-center justify-center">
                  <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                    Welcome to BikeCare
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                      {" "+User.username+" "}
                    </span>
                  </h1>
                  {/* <p className="bg-clip-text  text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500"> At BikeCare, we understand the importance of keeping your two-wheeled companion in top-notch condition. That's why we've created the ultimate bike service application to cater to all your motorcycle maintenance needs. Whether you're a seasoned rider or a casual bike enthusiast, our platform is designed to simplify the way you care for your motorcycle. </p> */}
              </div>
          </div>
          <WaveAnimation />
        </>
      )}
    </div>
  );
};

export default Home;
