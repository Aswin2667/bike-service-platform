import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleChange =(e)=>{


  }
  const handleSubmit = (event)=>{

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg">
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
    </div>
  );
};

export default Login;
