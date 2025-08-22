import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/image.png";

const Navbar = () => {
  return (
    <nav className="bg-[#280A3E] text-white px-6 py-4 flex items-center shadow-md">
      <div className="flex items-center space-x-3">
        <img className="w-16 rounded-sm shadow-xl" src={logo} alt="Logo" />
      </div>
    </nav>
  );
};

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />

      {/* Background + Login Box */}
      <div className="flex-grow bg-[#F2EDD1] flex items-center justify-center">
        <div className="bg-gradient-to-br from-[#84ADA0] to-[#A7C7B7] font-serif p-10 rounded-l shadow-2xl w-full max-w-md border border-white/30">
          <form onSubmit={submitHandler} className="flex flex-col">
            <h2 className="underline font-bold text-2xl mb-9 text-center text-[#280A3E] tracking-wide">
              Welcome Again Captain!
            </h2>

            {/* Email */}
            <label className="font-semibold text-xl text-[#280A3E] mb-2">Email Address</label>
            <input
              required
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="bg-[#FFDEAD] border-2 border-gray-400 mt-2 mb-4 px-4 py-3 rounded-md w-full text-[#280A3E] placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#280A3E] focus:border-[#280A3E] shadow-md transition"
            />

            {/* Password */}
            <label className="font-semibold text-xl text-[#280A3E] mb-2">Password</label>
            <input
              required
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="bg-[#FFDEAD] border-2 border-gray-400 mt-2 mb-6 px-4 py-3 rounded-md w-full text-[#280A3E] placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#280A3E] focus:border-[#280A3E] shadow-md transition"
            />

            {/* Login Button */}
            <button className="font-semibold bg-[#280A3E] text-white mt-4 px-4 py-3 rounded-md w-full text-xl hover:bg-[#3a1458] transition tracking-wider shadow-md">
              Login
            </button>

            {/* Signup link */}
            <p className="text-center  text-gray-700 mt-3 mb-2">
              Join the fleet? <Link to='/captain-signup' className="text-[#13006d] hover:underline">Register as a Captain</Link>

            </p>

            {/* Switch to User login */}
            <p className="text-center mt-4 text-lg">
              <Link 
                to="/login" 
                className="block font-semibold border-2 border-[#280A3E] text-[#280A3E] mt-2 px-4 py-3 rounded-md w-full text-xl hover:bg-[#280A3E] hover:text-white transition tracking-wider text-center shadow-md">
                Sign in as User
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
