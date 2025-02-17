import React from "react";

const Card = ({ children, className }) => {
  return <div className={`p-4 bg-white rounded-lg shadow-md ${className}`}>{children}</div>;
};

export default Card; // ✅ Ensure this is a default export
