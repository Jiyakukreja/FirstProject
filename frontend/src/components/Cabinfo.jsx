import React from "react";

const CabCard = ({ title, subtitle, desc, price, img, passengers, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl border border-[#E5DFC4] shadow-md cursor-pointer transition hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-1">
          <div className="rounded-full w-28 h-28 mr-8 overflow-hidden flex-shrink-0 border-2 border-[#689B8A]">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-[#280A3E] text-2xl tracking-wide font-semibold flex items-center gap-2">
              {title}
              <span className="flex items-center gap-1 text-lg text-[#689B8A]">
                <i className="ri-user-3-fill text-xl"></i>
                {passengers}
              </span>
            </h1>
            <h2 className="font-serif text-[#280A3E] text-lg mt-1">{subtitle}</h2>
            <h2 className="font-serif text-gray-600 text-base">{desc}</h2>
          </div>
        </div>
        <div className="text-right px-6">
          <h2 className="text-xl font-bold text-[#280A3E]">{price}</h2>
          <p className="text-gray-500 text-sm">Est. fare</p>
        </div>
      </div>
    </div>
  );
};

const Cabinfo = ({ onCabSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-6 py-6 px-6 bg-[#F2EDD1] rounded-t-2xl">
      <h2 className="font-serif text-2xl font-semibold text-left text-[#280A3E] mb-2">
        Rides we think you'll like
      </h2>

      <CabCard
        title="Electric Car"
        subtitle="2 mins away"
        desc="Affordable, Compact Rides"
        price="₹120"
        img="https://img.freepik.com/premium-vector/electric-car_1028208-11.jpg"
        passengers="4"
        onClick={onCabSelect}
      />

      <CabCard
        title="Auto Rickshaw"
        subtitle="3 mins away"
        desc="Quick, Low-Cost Ride"
        price="₹60"
        img="https://img.freepik.com/premium-vector/drawing-blue-tuk-tuk-with-word-auto-it_571487-2.jpg?w=360"
        passengers="3"
        onClick={onCabSelect}
      />

      <CabCard
        title="Bike Ride"
        subtitle="1 min away"
        desc="Fast, Solo Rides"
        price="₹40"
        img="https://media.istockphoto.com/id/486646914/photo/brandless-motorcycle-motorbike-vehicle-concept.jpg?s=612x612&w=0&k=20&c=Sq1vvuoSyX_QOtILqmyRtP2P6la0ScwwE_osvjcO65E="
        passengers="1"
        onClick={onCabSelect}
      />

      <h2 className="text-xl font-serif font-bold text-white bg-gradient-to-r from-[#280A3E] to-[#280A3E] px-4 py-2 rounded-lg shadow-md mt-6">
        Economy Rides
      </h2>

      <CabCard
        title="Economy SUV"
        subtitle="4 mins away"
        desc="Spacious, Comfortable Rides"
        price="₹250"
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mKee2OoHFmh1hi-bEllZRb5oiZy9JQ48_Lf93zgakEntWfnzDuNxQplXS5JtXEaYH3g&usqp=CAU"
        passengers="6"
        onClick={onCabSelect}
      />

      <CabCard
        title="Courier Delivery"
        subtitle="10 mins pickup"
        desc="Send parcels quickly & safely"
        price="₹150"
        img="https://media.istockphoto.com/id/1182653602/vector/food-delivery-man-riding-a-blue-scooter-man-courier-riding-scooter-with-parcel-box-fast.jpg?s=612x612&w=0&k=20&c=giLGuQDh6JVsGeGaKoHX7uVbPSAL8il29MWluM7PzhA="
        passengers="1"
        onClick={onCabSelect}
      />

      <CabCard
        title="Request Any"
        subtitle="Flexible booking"
        desc="Choose any ride type as per need"
        price="₹--"
        img="https://png.pngtree.com/thumb_back/fw800/background/20250715/pngtree-two-cars-moving-together-in-an-orange-and-yellow-color-gradient-image_17535485.png"
        passengers="--"
        onClick={onCabSelect}
      />
    </div>
  );
};

export default Cabinfo;
