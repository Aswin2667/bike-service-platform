import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:9090/user/register', formData);
      console.log('Registration successful', response.data);
      navigate("/");
    } catch (error) {
      // Handle API error, display error message
      console.error('Registration failed', error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center h-full bg-black w-full">
      <div className="h-screen w-1/2">
        <div className="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
          <div>
            <p className="text-2xl">Register|</p>
            <p>Please Register to Continue|</p>
          </div>
          <div className="my-6">
            <button className="flex w-full justify-center rounded-3xl border-none bg-white p-1 text-black hover:bg-gray-200 sm:p-2"><img src="https://freesvg.org/img/1534129544.png" className="mr-2 w-6 object-fill" />Sign up with Google</button>
          </div>
          <div>
            <fieldset className="border-t border-solid border-gray-600">
              <legend className="mx-auto px-2 text-center text-sm">Or Register via our secure system</legend>
            </fieldset>
          </div>
          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="mb-2.5 block font-extrabold" htmlFor="email">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder-opacity-30" placeholder="aswin@gmail.com" />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="mt-4">
                <label className="mb-2.5 block font-extrabold" htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </div>
              <div className="mt-4">
                <label className="mb-2.5 block font-extrabold" htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
              </div>
              <div className="mt-4 flex w-full flex-col justify-between sm:flex-row">
                <div><input type="checkbox" id="remember" /><label htmlFor="remember" className="mx-2 text-sm">Remember me</label></div>
              </div>
              <div className="my-10">
                <button type="submit" className="w-full rounded-full bg-orange-600 p-5 duration-500 hover:bg-orange-800">
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
