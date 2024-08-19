import React, { useState, useContext } from 'react';
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate('/');
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='login' className="flex justify-center items-center my-6 bg-gray-100 shadow-sm">
      <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-lg shadow-lg'>
        <div className='w-20 h-20 mx-auto'>
          <img src={loginIcons} alt='login icon' />
        </div>

        <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block text-gray-700'>Email:</label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              name='email'
              value={data.email}
              onChange={handleOnChange}
              className='w-full px-3 py-2 border border-gray-300 rounded outline-none'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-gray-700'>Password:</label>
            <div className='flex items-center border border-gray-300 rounded'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                placeholder='Enter password'
                value={data.password}
                name='password'
                onChange={handleOnChange}
                className='w-full px-3 py-2 border-none rounded outline-none'
                required
              />
              <div
                className='text-xl cursor-pointer px-2'
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <Link to='/forgot-password' className='block w-fit ml-auto text-blue-600 hover:underline'>
            Forgot password?
          </Link>

          <button
            type='submit'
            className='bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 w-full rounded-full mt-6 transition-transform transform hover:scale-105'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='mt-5 text-center'>
          Don't have an account?{" "}
          <Link to="/sign-up" className='text-blue-600 hover:text-blue-800 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
