import React, { useState } from "react";
import { Button } from "./Button"; // Ensure correct import of Button component

const Button2 = () => {
  const [growth, setGrowth] = useState(0);

  const handleGrowth = () => {
    setGrowth(growth + 1);
  };

  return (
    <div className="text-center p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">🐢 Your AI Pet</h2>
      <p className="mt-2">Growth Level: {growth}</p>
      <Button onClick={handleGrowth} className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Feed Your Pet
      </Button>
    </div>
  );
};

export default Button2; // ✅ Correct default export
