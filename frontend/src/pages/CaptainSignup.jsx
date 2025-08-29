import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userSignup from "../images/captainsignup.png";
import logo from "../images/logobg.png";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: Number(vehicleCapacity),
          vehicleType,
        },
      };

      // ✅ use correct env var
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      console.log("BASE_URL from env:", BASE_URL);

      const response = await axios.post(
        `${BASE_URL}/captain/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain/home");
      }

      // clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
    } catch (err) {
      console.error(
        "Captain signup error:",
        err?.response?.data || err.message || err
      );
      const message =
        err?.response?.data?.message ||
        (err?.response?.data?.errors &&
          err.response.data.errors[0]?.msg) ||
        "Signup failed";
      alert(message);
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

        <div className="font-serif bg-[#f2e5d1] p-4 rounded-2xl shadow-2xl w-full max-w-lg border-4 border-[#13006d]">
          <form onSubmit={submitHandler} className="flex flex-col">
            <div className="flex justify-center ">
              <img src={logo} alt="Raahi Logo" className="h-16 w-auto" />
            </div>

            <h2 className="underline font-bold text-2xl mb-5 text-center text-[#280A3E] tracking-wide">
              Sign Up as Captain
            </h2>

            {/* name */}
            <label className="font-semibold text-base mb-2 text-[#280A3E] tracking-wide">
              What's your name
            </label>
            <div className="flex gap-4 mb-3">
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First name"
                className="bg-[#FFDEAD] border border-gray-300 px-4 py-2 rounded-md w-1/2 text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
              />
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last name"
                className="bg-[#FFDEAD] border border-gray-300 px-4 py-2 rounded-md w-1/2 text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
              />
            </div>

            {/* email */}
            <label className="font-semibold text-base mb-2 text-[#280A3E] tracking-wide">
              Email Address
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="bg-[#FFDEAD] border border-gray-300 mb-2 px-4 py-2 rounded-md w-full text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
            />

            {/* password */}
            <label className="font-semibold text-base mb-2 text-[#280A3E] tracking-wide">
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
              className="bg-[#FFDEAD] border border-gray-300 mb-2 px-4 py-2 rounded-md w-full text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
            />

            {/* vehicle */}
            <label className="font-semibold text-base mb-2 text-[#280A3E] tracking-wide">
              Vehicle Details
            </label>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                type="text"
                placeholder="Vehicle Color"
                className="bg-[#FFDEAD] border border-gray-300 px-4 py-2 rounded-md w-full text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
              />
              <input
                required
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                type="text"
                placeholder="Vehicle Plate"
                className="bg-[#FFDEAD] border border-gray-300 px-4 py-2 rounded-md w-full text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
              />
              <input
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                type="number"
                placeholder="Vehicle Capacity"
                className="bg-[#FFDEAD] border border-gray-300 px-4 py-2 rounded-md w-full text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
              />
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-[#FFDEAD] border border-gray-300 px-4 py-2 rounded-md w-full text-base placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#280A3E] shadow-md"
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
              </select>
            </div>

            <button className="font-semibold bg-[#280A3E] text-white mt-2 px-4 py-2 rounded-md w-full text-lg hover:bg-[#3a1458] transition shadow-md tracking-wide">
              Create Captain Account
            </button>

            <p className="text-center text-gray-700 mt-3 text-sm">
              Already a member?{" "}
              <Link
                to="/captain-login"
                className="text-[#13006d] font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>

            <p className="text-center mt-5">
              <Link
                to="/signup"
                className="block font-semibold border-2 border-[#280A3E] text-[#280A3E] px-4 py-2 rounded-md w-full text-lg hover:bg-[#280A3E] hover:text-white transition tracking-wider shadow-md"
              >
                Sign Up as User
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
