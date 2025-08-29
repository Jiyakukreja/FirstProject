import React from 'react'

const Cabinfo = () => {
  return (
    <div className='space-y-4'> 
      {/* First Cab */}
      <div className='bg-gray-100 p-4 rounded-2xl border border-gray-300'>
        <div className='flex justify-between items-center m-3'>
          
          {/* Left side - details */}
          <div className='flex items-center flex-1 pl-4'>
            <div className='rounded-full w-40 h-40 mr-24 overflow-hidden'>
              <img 
                src="https://img.freepik.com/premium-vector/electric-car_1028208-11.jpg"  
                alt="Cab Info" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <h1 className='font-serif text-black text-2xl tracking-wide font-semibold flex items-center'>
                Electric Car 
                <i className="ri-user-3-fill ml-3 text-xl"></i>
              </h1>
              <h2 className='font-serif text-black text-lg tracking-wide font-semibold mt-2'>
                2 mins away
              </h2>
              <h2 className='font-serif text-black text-lg tracking-wide font-semibold mt-1'>
                Affordable, Compact Rides
              </h2>
            </div>
          </div>

          {/* Right side - cost */}
          <div className="text-right pr-20">
            <h2 className="text-xl font-bold text-black">₹120</h2>
            <p className="text-gray-600">Est. fare</p>
          </div>
        </div>
      </div>

      {/* Second Cab - Auto */}
      <div className='bg-gray-100 p-4 rounded-2xl border border-gray-300'>
        <div className='flex justify-between items-center m-3'>
          {/* Left */}
          <div className='flex items-center flex-1 pl-4'>
            <div className='rounded-full w-40 h-40 mr-24 overflow-hidden'>
              <img 
                src="https://img.freepik.com/premium-vector/auto-rickshaw-icon_1028208-12.jpg"  
                alt="Auto Rickshaw" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <h1 className='font-serif text-black text-2xl tracking-wide font-semibold flex items-center'>
                Auto Rickshaw
                <i className="ri-user-3-fill ml-3 text-xl"></i>
              </h1>
              <h2 className='font-serif text-black text-lg tracking-wide font-semibold mt-2'>
                3 mins away
              </h2>
              <h2 className='font-serif text-black text-lg tracking-wide font-semibold mt-1'>
                Quick, Low-Cost Ride
              </h2>
            </div>
          </div>

          {/* Right */}
          <div className="text-right pr-20">
            <h2 className="text-xl font-bold text-black">₹60</h2>
            <p className="text-gray-600">Est. fare</p>
          </div>
        </div>
      </div>

      {/* Third Cab - Bike */}
      <div className='bg-gray-100 p-4 rounded-2xl border border-gray-300'>
        <div className='flex justify-between items-center m-3'>
          {/* Left */}
          <div className='flex items-center flex-1 pl-4'>
            <div className='rounded-full w-40 h-40 mr-24 overflow-hidden'>
              <img 
                src="https://img.freepik.com/premium-vector/motorbike-icon_1028208-13.jpg"  
                alt="Bike Ride" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <h1 className='font-serif text-black text-2xl tracking-wide font-semibold flex items-center'>
                Bike Ride 
                <i className="ri-user-3-fill ml-3 text-xl"></i>
              </h1>
              <h2 className='font-serif text-black text-lg tracking-wide font-semibold mt-2'>
                1 min away
              </h2>
              <h2 className='font-serif text-black text-lg tracking-wide font-semibold mt-1'>
                Fast, Solo Rides
              </h2>
            </div>
          </div>

          {/* Right */}
          <div className="text-right pr-20">
            <h2 className="text-xl font-bold text-black">₹40</h2>
            <p className="text-gray-600">Est. fare</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cabinfo
