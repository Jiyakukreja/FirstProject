import React, { useState } from "react";
import { Link } from "react-router-dom";
import captainLoginBg from "../images/logincap.png"; // 👈 background image import

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({ email: email, password: password });
    setEmail('');
    setPassword('');
  };

  return (
    <div
      className="h-screen w-full flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${captainLoginBg})` }} 
    >
      <div className="relative flex-grow flex items-center justify-center">
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center space-x-2 text-lg font-medium text-[#280A3E] hover:text-[#3a1458] transition"
        >
          <span className="text-xl font-serif text-[#FFDEAD]">←</span>
          <span className="text-xl font-serif text-[#FFDEAD]">Back to Home</span>
        </Link>

        <div className="bg-gradient-to-br from-[#84ADA0]/90 to-[#A7C7B7]/90 font-serif p-10 rounded-2xl shadow-2xl w-full max-w-md border-4 border-[#F2EDD1] backdrop-blur-sm">
          <form onSubmit={submitHandler} className="flex flex-col">
            <h2 className="underline font-bold text-2xl mb-9 text-center text-[#280A3E] tracking-wide">
              Welcome Again Captain!
            </h2>

            <label className="font-semibold text-xl text-[#280A3E] mb-2">Email Address</label>
            <input
              required
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="bg-[#FFDEAD] border-2 border-gray-400 mt-2 mb-4 px-4 py-3 rounded-md w-full text-[#280A3E] placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#280A3E] focus:border-[#280A3E] shadow-md transition"
            />

            <label className="font-semibold text-xl text-[#280A3E] mb-2">Password</label>
            <input
              required
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="bg-[#FFDEAD] border-2 border-gray-400 mt-2 mb-6 px-4 py-3 rounded-md w-full text-[#280A3E] placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#280A3E] focus:border-[#280A3E] shadow-md transition"
            />

            <button className="font-semibold bg-[#280A3E] text-white mt-4 px-4 py-3 rounded-md w-full text-xl hover:bg-[#3a1458] transition tracking-wider shadow-md">
              Login
            </button>

            <p className="text-center  text-gray-700 mt-3 mb-2">
              Join the fleet? <Link to='/captain-signup' className="text-[#13006d] hover:underline">Register as a Captain</Link>
            </p>

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
