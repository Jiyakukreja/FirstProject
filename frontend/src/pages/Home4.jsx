import React from "react";

const Home4 = () => {
  return (
    <div className="py-20 px-8" style={{ backgroundColor: "#F2EDD1" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center font-serif">
        <div className="bg-[#689B8A] aspect-square flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300">
          <h3 className="text-3xl font-bold mb-4 text-white">Smart Booking</h3>
          <p className="text-white text-lg text-center">
            With Raahi, booking a ride is as simple as a few taps. Schedule instant rides or plan trips in advance, and we’ll make sure a cab is always available when you need it.
          </p>
        </div>

        <div className="bg-[#E3A66B] aspect-square flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300">
          <h3 className="text-3xl font-bold mb-4 text-[#280A3E]">Transparent Pricing</h3>
          <p className="text-[#280A3E] text-lg text-center">
            No hidden charges, no surprises. Get real-time fare estimates before you book, with smart route optimization to give you the best value for your journey.
          </p>
        </div>

        <div className="bg-[#280A3E] aspect-square flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300">
          <h3 className="text-3xl font-bold mb-4 text-white">Safe & Reliable Rides</h3>
          <p className="text-white text-lg text-center">
            Verified drivers, GPS-enabled rides, secure payments, and 24/7 support — Raahi ensures that every trip is safe, comfortable, and stress-free.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home4;
