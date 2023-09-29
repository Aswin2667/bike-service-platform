import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { message } from "antd";
import AnimatedBG from "../Background/AnimatedBG";
UserService
const Login = () => {
  const [formData, setFormData] = useState({
    username:"",
    password: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    const username = formData.username;
    if(username.length<3){
      message.error("UserName must be greater than or Equal to 3 characters!!");
      return false ;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()){
      UserService.findUser(formData).then((response)=>{
        const User = response.data;
        if(!User.status){
          message.error(User.msg);
          return;
        }
        message.success("Logged In Successfully :) ");
        navigate("/home");
      }).catch((err)=>{
        console.log(err);
      })
    } 
  };
  const handleKeyPress = (e)=>{
    if(e.key==="Enter"){
      handleSubmit(e);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full z-40 max-w-md p-6 bg-gray-800 bg-opacity-70 rounded-lg">
        <div className="flex items-center justify-center gap-15 mb-6">
          <img className="h-20 " src="src/assets/logo.svg" alt="logo" />
          <h1 className="text-4xl text-white font-bold uppercase">bike service</h1>
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
            className="w-full px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg mb-4 focus:outline-none focus:border-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg mb-4 focus:outline-none focus:border-purple-400 focus:border-3"
          />
          <button
            type="submit"
            className="w-full bg-purple-600  text-white py-2 rounded-md text-lg font-bold uppercase duration-500 hover:bg-purple-700 focus:outline-none "
          >
            Log In
          </button>
          <p className="mt-4 text-white">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 font-bold">
              Create One.
            </Link>
          </p>
        </form>
      </div>
      <AnimatedBG />
      
    </div>
  );
};

export default Login;
