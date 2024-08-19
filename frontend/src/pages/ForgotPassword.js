import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummeryApi from '../common';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request body
    const requestBody = {
      email,
      newPassword,
      answer
    };

    try {
      // Make the API call using fetch
      const response = await fetch(SummeryApi.forgotPassword.url, {
        method: SummeryApi.forgotPassword.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Error resetting password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section id="forgot-password" className="flex justify-center items-center my-6 bg-gray-100">
      <div className="bg-white p-6 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <h4 className="text-center text-xl font-semibold mb-6">Reset Password</h4>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="answer" className="block text-gray-700">What is Your Favourite Game:</label>
            <input
              type="text"
              id="answer"
              placeholder="Enter Your Favorite Game"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-gray-700">New Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded pr-10 outline-none"
                required
              />
              <div
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-xl"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 w-full rounded-full mt-4 transition-transform transform hover:scale-105"
          >
            Reset
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
