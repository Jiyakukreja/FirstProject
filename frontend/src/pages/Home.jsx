import React, { useState, useRef } from 'react';
import logo from '../images/image.png';
import map from '../images/map.png';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import Cabinfo from '../components/Cabinfo';

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const [vehiclePanel, setVehiclePanel] = useState(false);

  const panelRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pickup:", pickup);
    console.log("Destination:", destination);
  };

  // GSAP animation for panel & form shift
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "40%",   // fixed height
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(formRef.current, {
        y: -145,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.in"
      });

      gsap.to(formRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [panelOpen]);

  return (
    <div className="relative min-h-screen p-4 bg-[#8eb4a7] flex flex-col">

      {/* Background Map */}
      <div className="absolute inset-0">
        <img src={map} alt="Map" className="h-full w-full object-cover" />
      </div>

      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="absolute top-7 left-5 w-24 h-auto rounded-xl z-10"
      />

      {/* Bottom Main Card */}
      <div className="absolute bottom-0 left-0 w-full bg-[#F2EDD1] z-10 rounded-lg pb-10">
        <div
          ref={formRef}
          className="relative left-1/2 transform -translate-x-1/2 w-[65%] -top-28 bg-[#507a6c] px-9 py-7 shadow-lg flex flex-col rounded"
        >
          {/* Heading */}
          <div className="bg-[#d3e2dd] text-2xl text-[#280A3E] font-serif w-auto h-auto px-6 py-3 font-semibold tracking-wider flex items-center justify-between">
            <span>Find a Trip</span>
            <h5 onClick={() => setPanelOpen(false)}>
              <i className="ri-arrow-down-wide-fill"></i>
            </h5>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-4 mt-4 relative">
              <div className="line absolute h-20 w-1 top-[18%] left-7 bg-black rounded-md"></div>
              <input
                onClick={() => setPanelOpen(true)}
                type="text"
                placeholder="Add a pick-up Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full p-3 px-12 bg-[#f6f2de] text-xl font-serif text-gray-900 tracking-wide border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#689B8A] focus:border-transparent"
                required
              />
              <input
                type="text"
                onClick={() => setPanelOpen(true)}
                placeholder="Enter your Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 px-12 text-xl bg-[#f6f2de] font-serif text-gray-900 tracking-wide border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#689B8A] focus:border-transparent"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-[#F9CB99] text-[#280A3E] font-serif text-lg font-semibold py-3 shadow hover:bg-[#f7b971] transition"
              >
                See Prices
              </button>
              <button
                type="button"
                className="flex-1 bg-[#d3e2dd] text-[#280A3E] font-serif text-lg font-semibold py-3 shadow hover:bg-[#c1d6ce] transition"
                onClick={() => alert("Scheduled for later")}
              >
                Schedule for Later
              </button>
            </div>
          </form>
        </div>
      </div>

{/* Slide-up Panel with LocationSearchPanel */}
<div
  ref={panelRef}
  className="absolute bottom-0 left-0 w-full h-0 z-20 shadow-2xl rounded-t-2xl overflow-y-auto"
  style={{ maxHeight: "40%" }}
>
  <div className="relative left-1/2 transform -translate-x-1/2 w-[65%] mt-4 flex flex-col gap-4">
    {/* Location suggestions */}
    <LocationSearchPanel onClose={() => setPanelOpen(false)} />
</div>
</div>

<div className="absolute bottom-14 left-0 w-full bg-[#431167] shadow-md rounded-2xl p-6 z-30">
  <h2 className='text-white font-serif text-3xl font-bold pb-3'>Choose a Vehicle</h2>
  <Cabinfo />
</div>

</div>
  );
};

export default Home;
