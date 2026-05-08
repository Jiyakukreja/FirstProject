import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { UserContext } from "../context/UserContext";
import axios from "axios";
import loginBg from "../images/login.png";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`, 
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("Login Token:", data.token);

        setUser(data.user);
        localStorage.setItem("token", data.token);
        setEmail("");
        setPassword("");
        navigate("/home");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }} 
    >
      <div className="relative flex-grow flex items-center justify-center">
        
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center space-x-2 text-lg font-medium text-white hover:text-gray-200 transition"
        >
          <span className="text-xl font-serif">←</span>
          <span className="text-xl font-serif">Back to Home</span>
        </Link>

        <div className="font-serif bg-[#F2EDD1]/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border-4 border-[#F2EDD1]">
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
              onChange={(e)=> setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="bg-[#FFDEAD] border border-gray-300 mt-2 mb-4 px-4 py-3 rounded-md w-full text-lg placeholder:text-base placeholder:text-gray-600 tracking-wide focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
            />

            <h3 className="font-semibold text-xl mb-2 text-[#280A3E] tracking-wide">
              Password
            </h3>
            <input
              required
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
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
