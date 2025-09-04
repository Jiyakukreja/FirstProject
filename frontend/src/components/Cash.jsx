import React from "react";

const Cash = ({ onConfirm }) => {
  return (
    <div className="text-center space-y-6 font-serif">
      <div className="flex justify-center">
        <span className="text-6xl">💵</span>
      </div>
      <h2 className="text-xl font-bold text-gray-800">Cash Payment Selected</h2>
      <p className="text-gray-600 text-sm">
        Change may not be available, so pay with the exact cash amount if you can.
      </p>

      <button
        onClick={onConfirm}
        className="bg-black text-white w-full py-3 rounded-lg font-medium hover:bg-gray-800"
      >
        Confirm
      </button>
    </div>
  );
};

export default Cash;
