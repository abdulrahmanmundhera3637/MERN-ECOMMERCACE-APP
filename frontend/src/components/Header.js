import React, { useContext, useState, useCallback } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import debounce from 'lodash.debounce'; // Import lodash debounce
import SummeryApi from '../common';

const Header = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput.search);
  const searchQuery = URLSearch.get("q") || "";
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummeryApi.logout_user.url, {
        method: SummeryApi.logout_user.method,
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  const handleSearch = useCallback(
    debounce((value) => {
      navigate(value ? `/search?q=${value}` : "/search");
    }, 300), // Debounce for 300ms
    [navigate]
  );

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    handleSearch(value);
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to={"/"}>
            <Logo w={-70} h={-30} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input 
            type='text' 
            placeholder='Search products...' 
            className='w-full outline-none' 
            onChange={onSearchChange} 
            value={search} 
          />
          <div onClick={onSearchChange} className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          {user?._id && (
            <div className='relative flex justify-center'>
              <div 
                className='text-3xl cursor-pointer relative flex justify-center' 
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user.profilePic} className='w-10 h-10 rounded-full' alt={user.name} />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
              
              {menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link 
                        to={"/admin-panel/all-products"} 
                        className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' 
                        onClick={() => setMenuDisplay(prev => !prev)}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
          )}

          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart /></span>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button 
                onClick={handleLogout} 
                className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
              >
                Logout
              </button>
            ) : (
              <Link 
                to={"/login"} 
                className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
