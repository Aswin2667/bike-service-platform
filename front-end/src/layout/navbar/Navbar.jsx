import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateIndex } from "../../store/NavIndex";
import { message } from "antd";
const Navbar = () => {
  const Menus = [
    { name: "Home", icon: "home-outline", dis: "-translate-y-5 " },
    { name: "Services", icon: "construct", dis: "translate-y-9 mt-5" },
    { name: "Chat", icon: "chatbubble-outline", dis: "translate-y-32" },
    { name: "Bookings", icon: "cart", dis: "translate-y-40 mt-11" },
    { name: "Settings", icon: "settings-outline", dis: "translate-y-64 mt-7" },
  ];
  const active = useSelector((state) => state.navindex.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = ()=>{
    message.success("Logged out Successfully :)");
    
    navigate("/");
  }
  return (
    <>
      <div className="bg-white  h-screen w-20 p-2 flex flex-col items-center opacity-90 justify-between pt-6 rounded-l-none rounded-xl">
        <ul className=" flex flex-col">
          <span
            className={`bg-purple-600 ${Menus[active].dis} duration-500  border-4 border-gray-900 h-16 w-16 absolute
          rounded-full ml-6 `}
          >
            <span
              className="w-5 h-4 bg-transparent absolute -top-5 left-7 -rotate-180 -right-[20px] 
            rounded-tl-[11px] shadow-myShadow2 "
            ></span>
            <span
              className="w-4 h-4 bg-transparent absolute top-full mt-0.5 left-8 rotate-90 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2 "
            ></span>
          </span>
          {Menus.map((menu, i) => (
            <li key={i} className="h-full w-16 relative">
              <a 
                className="flex flex-col text-center pt-6"
                onClick={() =>{
                navigate(`/${menu.name}`)
                dispatch(updateIndex(i))
                }}
              >
                <span
                  className={`text-xl cursor-pointer duration-500 ${
                    i === active &&
                    "-mt-6 text-white translate-x-5 duration-700"
                  }`}
                >
                  <ion-icon name={menu.icon}></ion-icon>
                </span>
                <span
                  className={` ${
                    active === i
                      ? "translate-y-4 duration-700 opacity-100"
                      : "opacity-0 translate-y-10"
                  } `}
                >
                  {menu.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <span className="text-3xl cursor-pointer mb-5 text-black hover:color-grey-600" onClick={handleLogout}>
          <ion-icon name="log-out"></ion-icon>
        </span>
      </div>
    </>
  );
};

export default Navbar;