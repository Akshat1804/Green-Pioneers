import React from "react";

const Input = ({ placeholder, value, onChange, className = "" }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default Input;