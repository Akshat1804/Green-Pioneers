import React from "react";

const Progress = ({ value }) => {
  return (
    <div className="w-full bg-gray-300 rounded-full h-6 mt-4">
      <div
        className="bg-green-500 h-6 rounded-full transition-all"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default Progress; // ✅ Ensure this is a default export
