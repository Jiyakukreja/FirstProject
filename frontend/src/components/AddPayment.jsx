import React from "react";

const AddPayment = ({ onSelect }) => {
  return (
    <div className="space-y-10 font-serif">
      <h2 className="text-2xl font-bold text-gray-800">Add payment method</h2>

      {/* Gift Card */}
      <div
        onClick={() => onSelect("giftcard")}
        className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <div className="flex items-center gap-2 font-serif">
          <img
            src="https://www.shutterstock.com/image-vector/gift-icon-box-vector-sign-260nw-1247883349.jpg"
            alt="Gift Card"
            className="w-9 h-10"
          />
          <span className="text-xl font-medium">Gift Card</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>

      {/* Cash */}
      <div
        onClick={() => onSelect("cash")}
        className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">💵</span>
          <span className="text-lg font-medium">Cash</span>
        </div>
        <span className="text-gray-400">{">"}</span>
      </div>
    </div>
  );
};

export default AddPayment;
