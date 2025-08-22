import React, { useState } from "react";
import logo from '../images/image.png';
import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <nav className="bg-[#280A3E] text-white px-6 py-4 flex items-center shadow-md">
      {/* Left side logo */}
      <div className="flex items-center space-x-3">
        <img 
          className="w-16 rounded-sm shadow-xl" 
          src={logo} 
          alt="Logo" 
        />      
      </div>
    </nav>
  );
};

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({ })


  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password
    })
    console.log(userData);
    setEmail('');
    setPassword('');
  };
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Background + Centered Login Box */}
      <div className="flex-grow bg-gradient-to-br from-[#84ADA0] to-[#A7C7B7] flex items-center justify-center">
        <div className="font-serif bg-[#F2EDD1]/70 backdrop-blur-lg p-10 rounded-l shadow-lg w-full max-w-md border border-white/30">
          <form onSubmit={submitHandler} className="flex flex-col">
            <h2 className="underline font-bold text-2xl mb-10 text-center text-[#280A3E] tracking-wide">
              Welcome Again User!
            </h2>

            <h3 className="font-semibold text-xl mb-2 text-[#280A3E] tracking-wide">
             Email Address
            </h3>
            <input
              required
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter your email"
              className="bg-[#FFDEAD] border border-gray-300 mt-2 mb-4 px-4 py-3 rounded-md w-full text-lg placeholder:text-base placeholder:text-gray-600 tracking-widefocus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
            />

            <h3 className="font-semibold text-xl mb-2 text-[#280A3E] tracking-wide">
              Password
            </h3>
            <input
              required
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
              className="bg-[#FFDEAD] border border-gray-300 mt-2 mb-6 px-4 py-3 rounded-md w-full text-lg placeholder:text-base placeholder:text-gray-600 tracking-wide focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
            />

            <button
              className="font-semibold bg-[#280A3E] text-white mt-4 px-4 py-3 rounded-md w-full text-xl hover:bg-[#3a1458] transition tracking-wider shadow-md"
            >
              Login
            </button>

            <p className="text-center text-gray-700 mt-3 mb-2">
              New Here? <Link to='/signup' className="text-[#13006d] hover:underline">Create new Account</Link>
            </p>

            {/* Sign in as captain */}
            <p className="text-center mt-4 text-lg">
              <Link 
                to="/captain-login" 
                className="block font-semibold border-2 border-[#280A3E] text-[#280A3E] mt-2 px-4 py-3 rounded-md w-full text-xl hover:bg-[#280A3E] hover:text-white transition tracking-wider text-center shadow-md"
              >
                Sign in as Captain
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
