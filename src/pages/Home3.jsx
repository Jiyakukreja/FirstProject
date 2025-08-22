import React from "react";

const Home3 = () => {
  return (
    <div className="py-5 px-8 border-[#280A3E] " style={{ backgroundColor: "#F9CB99" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="font-serif">
          <h2 className="text-5xl md:text-7xl font-bold text-[#280A3E] mb-6">
            Your Safety, Our{" "}
            <span className="text-[#527D6F]">Promise.</span>
          </h2>
          <p className="text-gray-700 text-lg">
            At Raahi, we don’t just move you from one place to another but we make every journey secure, reliable, and stress-free. Your safety is our top priority.
          </p>
        </div>

        <div className="relative w-full h-[500px] flex justify-center items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2345/2345454.png"
            alt="Seatbelt"
            className="
              rounded-2xl 
              shadow-2xl 
              border-4 
              border-[#E3A66B] 
              max-w-[500px] 
              max-h-[400px] 
              object-contain 
              transition-transform 
              duration-500 
              hover:scale-103
              hover:shadow-[#E3A66B]/50
              bg-[#F2EDD1]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Home3;
