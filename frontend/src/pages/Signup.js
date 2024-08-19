import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imagetobase64.js";
import SummeryApi from "../common/index.js";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
    answer: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummeryApi.signUp.url, {
        method: SummeryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      console.log("please check password and confirm password");
    }
  };

  return (
    <section id="signup" className="flex justify-center items-center my-6 bg-gray-100 shadow-sm">
      <div className="bg-white p-5 w-full max-w-lg mx-auto rounded-lg shadow-lg relative"> {/* Changed max-w-sm to max-w-lg */}
        <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-full">
          <img
            src={data.profilePic || loginIcon}
            alt="Profile"
            className="object-cover w-full h-full"
          />
          <label
            htmlFor="fileUpload"
            className="absolute bottom-0 right-0 bg-slate-200 text-xs cursor-pointer text-center w-32 h-16 flex items-center justify-center bg-opacity-80 rounded-br-full"
          >
            Upload photo
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleUploadPic}
            />
          </label>
        </div>

        <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              name="name"
              required
              value={data.name}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              required
              value={data.email}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <div className="flex items-center border border-gray-300 rounded">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                name="password"
                required
                value={data.password}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border-none rounded outline-none"
              />
              <div
                className="text-xl cursor-pointer px-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
            <div className="flex items-center border border-gray-300 rounded">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                value={data.confirmPassword}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border-none rounded outline-none"
              />
              <div
                className="text-xl cursor-pointer px-2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="answer" className="block text-gray-700">What is Your Favourite Game:</label>
            <input
              type="text"
              id="answer"
              placeholder="Write Answer"
              name="answer"
              required
              value={data.answer}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-900 text-white px-6 py-2 w-full rounded-full mt-6 transition-transform transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
