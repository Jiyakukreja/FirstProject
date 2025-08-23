import React, { useState } from "react";
import { Link } from "react-router-dom";
import userSignup from '../images/userSignup.png'; 
import logo from '../images/logobg.png';

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();

    // Build payload matching backend expected shape
    const payload = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const res = await fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Signup response:', data);

      if (!res.ok) {
        // show server validation or error message
        alert(data.message || (data.errors && data.errors[0]?.msg) || 'Signup failed');
        return;
      }

      // Success: you can redirect to login or show a success message
      alert('Signup successful');

      // Clear inputs
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Signup error:', err);
      alert('Network error, please try again');
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

        {/* Box broad kiya - max-w-lg */}
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
