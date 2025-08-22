import React from "react";
import { Link } from "react-router-dom";  // 👈 yeh add kiya

const Home5 = () => {
  return (
    <div className="py-16 px-8 font-serif" style={{ backgroundColor: "#689B8A" }}>
      <div className="max-w-5xl mx-auto bg-[#280A3E]/90 rounded-2xl shadow-xl p-10 text-center text-[#F2EDD1]">
        
        {/* Icon + Heading */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl mb-3">🧭</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Join Us as a Captain
          </h2>
          <div className="w-20 h-1 bg-[#F9CB99] mt-2 rounded-full"></div>
        </div>

        {/* Subtext */}
        <p className="text-lg md:text-xl mb-6">
          At <span className="font-semibold">Raahi</span>, we’re building more than rides – 
          we’re creating a journey of trust, safety, and growth.  
          If you’re driven, responsible, and ready to make an impact,  
          we’d love to welcome you aboard as a Captain.
        </p>

        {/* Highlight */}
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-[#F9CB99]">
          Drive with Raahi. Lead the way forward.
        </h3>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/captain-signup">
            <button className="bg-[#F9CB99] text-[#280A3E] font-semibold px-6 py-3 rounded-lg text-lg shadow-md hover:bg-[#F2EDD1] transition">
              Get Started Today
            </button>
          </Link>
          <button className="border-2 border-[#F9CB99] text-[#F9CB99] font-semibold px-6 py-3 rounded-lg text-lg hover:bg-[#F9CB99] hover:text-[#280A3E] transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home5;
