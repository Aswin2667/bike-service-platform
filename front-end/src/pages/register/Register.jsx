import React, { useState } from 'react';
import {message} from "antd"
import { useNavigate ,Link} from 'react-router-dom';
import AnimatedBG from '../../components/login_BG/AnimatedBG';
import { validateForm } from '../../utils/helper/validation';
import UserService from '../../services/userservice/UserService';
import SetAvatar from '../../components/setavatar/SetAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../slices/User';
const Register = () => {
  const [formData, setFormData] = useState({
    username:"",
    email: '',
    password: '',
    confirmPassword: '',
    isAvatarImageSet:false,
    avatarimage:"",
    phonenumber:""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar,setAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm(formData)){
      UserService.saveUser(formData).then((response)=>{
        const User = response.data;
        if(!User.status){
          message.error(User.msg);
          return;
        }
        setIsLoading(true);
        dispatch(updateUser(User.user));
        setAvatar(true)
      }).catch((err)=>{
        console.log(err);
      })
    } 
  };
  const handleKey = (e)=>{
    if(e.key==="Enter"){
      handleSubmit(e);
    }
  }
  return (
    !avatar ?
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 z-40 bg-opacity-70 rounded-lg">
      <div className="flex items-center justify-center gap-15 mb-6">
          <img className="h-20 " src="src/assets/icons/logo.svg" alt="logo" />
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
            type="numeric"
            placeholder="Mobile Number"
            name="phonenumber"
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
    </div>:
    <SetAvatar />
  );
};

export default Register;
