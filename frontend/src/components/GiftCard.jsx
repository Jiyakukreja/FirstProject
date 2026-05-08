import React from "react";

const GiftCard = ({ onConfirm }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <span className="text-5xl">🎁</span>
      </div>
      <h2 className="text-xl font-bold text-gray-800">Gift Card Selected</h2>
      <p className="text-gray-600 text-sm">
        Enter your gift card details to continue.
      </p>

      <input
        type="text"
        placeholder="Enter Gift Card Code"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-400"
      />

      <button
        onClick={onConfirm}
        className="bg-black text-white w-full py-3 rounded-lg font-medium hover:bg-gray-800"
      >
        Confirm
      </button>
    </div>
  );
};

export default GiftCard;
