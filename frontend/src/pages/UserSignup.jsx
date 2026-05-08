import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { UserContext } from "../context/UserContext"; 
import axios from "axios";
import userSignup from '../images/userSignup.png'; 
import logo from '../images/logobg.png';

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); 

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`, 
        payload
      );

      // ✅ 200 (OK) ya 201 (Created) dono handle karo
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        console.log("Signup Response:", data);

        // token ko localStorage me daalna
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("Signup Token:", data.token);
        }

        // user ko context me set karna
        if (data.user) {
          setUser(data.user);
        } else {
          // fallback agar backend user directly na bheje
          setUser({
            email: data.email || email,
            fullname: {
              firstname: data.fullname?.firstname || firstName,
              lastname: data.fullname?.lastname || lastName
            }
          });
        }

        // form reset
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

        navigate('/home');
      } else {
        alert(response.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${userSignup})` }}
    >
      <div className="relative flex-grow flex items-center justify-center">
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center space-x-2 text-base font-medium text-white hover:text-gray-200 transition"
        >
          <span className="text-black text-lg font-serif">←</span>
          <span className="text-black text-lg font-serif">Back to Home</span>
        </Link>

        <div className="font-serif bg-[#f2e5d1] p-6 rounded-2xl shadow-2xl w-full max-w-lg border-4 border-[#13006d]">
          <form onSubmit={submitHandler} className="flex flex-col">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Raahi Logo" className="h-14 w-auto" />
            </div>

            <h2 className="underline font-bold text-2xl mb-8 text-center text-[#280A3E] tracking-wide">
              Sign Up for Raahi
            </h2>

            <label className="font-semibold text-base mb-2 text-[#280A3E] tracking-wide">
              What's your name
            </label>
            <div className="flex gap-3 mb-4">
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First name"
                className="bg-[#FFDEAD] border border-gray-300 px-3 py-2 rounded-md w-1/2 text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
              />
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last name"
                className="bg-[#FFDEAD] border border-gray-300 px-3 py-2 rounded-md w-1/2 text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
              />
            </div>

            <label className="font-semibold text-base mb-2 text-[#280A3E] tracking-wide">
              Email Address
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="bg-[#FFDEAD] border border-gray-300 mb-4 px-3 py-2 rounded-md w-full text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
            />

            <label className="font-semibold text-base mb-2 text-[#280A3E] tracking-wide">
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
              className="bg-[#FFDEAD] border border-gray-300 mb-6 px-3 py-2 rounded-md w-full text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
            />

            <button className="font-semibold bg-[#280A3E] text-white mt-2 px-3 py-2 rounded-md w-full text-lg hover:bg-[#3a1458] transition shadow-md tracking-wide">
              Sign Up
            </button>

            <p className="text-center text-gray-700 mt-3 text-sm">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-[#13006d] font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>

            <p className="text-center mt-5">
              <Link
                to="/captain-signup"
                className="block font-semibold border-2 border-[#280A3E] text-[#280A3E] px-3 py-2 rounded-md w-full text-lg hover:bg-[#280A3E] hover:text-white transition tracking-wider shadow-md"
              >
                Sign up as Captain
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
