import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNav from "../components/LoginNav";


const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu"];

const AuthPage = () => {
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedState) {
      alert("Please select a state.");
      return;
    }
    localStorage.setItem("userState", selectedState);
    navigate("/dashboard");
  };

  return (
    <div id="img" className=" img flex flex-col items-center justify-start h-screen  bg-gray-100">
      <LoginNav />
      <form id="inset" className=" p-20 mt-20 rounded-xl">
        <h1 className="text-sm">Username:-</h1>
        <input type="text" placeholder="Enter your name" />
        <br />
        <h1 className="text-sm">Password:-</h1>
        <input type="password" placeholder="Enter your Password" />
        <br />
      <h1 className="text-sm ">Select Your State</h1>
      <select
        className="border p-2 rounded"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      </form>

    </div>
  );
};

export default AuthPage;


