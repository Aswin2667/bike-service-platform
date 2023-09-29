import React, { useState } from 'react';
import axios from 'axios';
import {message} from "antd"
import { useNavigate ,Link} from 'react-router-dom';
import UserService from '../../services/UserService';
import AnimatedBG from '../Background/AnimatedBG';
const Register = () => {
  const [formData, setFormData] = useState({
    username:"",
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const {username, password,confirmPassword,email} = formData;
    if(password!==confirmPassword){
      message.error("Password doesn't match!");
      return false;
    }
    if(username.length<3){
      message.error("UserName must be greater than or Equal to 3 characters!!");
      return false ;
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
        message.error("Please Enter a Valid E-mail address!!");
        return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()){
      UserService.saveUser(formData).then((response)=>{
        const User = response.data;
        if(!User.status){
          message.error(User.msg);
          return;
        }
        setIsLoading(true);
        message.success("Regiteration success. You can log in now :) ");
        navigate("/");
      }).catch((err)=>{
        console.log(err);
      })
    } 
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 z-40 bg-opacity-70 rounded-lg">
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
            className="w-full px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg mb-4 focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg mb-4 focus:outline-none focus:border-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg mb-4 focus:outline-none focus:border-purple-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg mb-4 focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md text-lg font-bold uppercase hover:bg-purple-700 focus:outline-none"
          >
            {
              isLoading?"Creating........":"Create User"
            }
          </button>
          <p className="mt-4 text-white">
            Already have an account?{" "}
            <Link to="/" className="text-purple-600 font-bold">
              Login.
            </Link>
          </p>
        </form>
      </div>
      <AnimatedBG />
    </div>
  );
};

export default Register;
