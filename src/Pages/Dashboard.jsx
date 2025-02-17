import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LeftBar from "../components/LeftBar";
import NavBar from "../components/NavBar";

const carbonData = {
  Delhi: { total: 5000, average: 200, lowest: 150 },
  Maharashtra: { total: 7000, average: 250, lowest: 180 },
  Karnataka: { total: 4500, average: 190, lowest: 130 },
  "Tamil Nadu": { total: 6000, average: 220, lowest: 160 },
};

const leaderboardData = {
  Delhi: [
    { name: "Amit", points: 1200, streak: 10 },
    { name: "Rohit", points: 1100, streak: 8 },
    { name: "Raj", points: 1000, streak: 7 },
    { name: "Sachin", points: 900, streak: 6 },
    { name: "Vijay", points: 800, streak: 5 },
  ],
  Maharashtra: [
    { name: "Priya", points: 1300, streak: 12 },
    { name: "Vikas", points: 1150, streak: 9 },
    { name: "Neha", points: 1100, streak: 8 },
    { name: "Arun", points: 1050, streak: 7 },
    { name: "Rahul", points: 1000, streak: 6 },
  ],
  Karnataka: [
    { name: "Rahul", points: 1000, streak: 7 },
    { name: "Neha", points: 900, streak: 6 },
    { name: "Vijay", points: 800, streak: 5 },
    { name: "Arun", points: 700, streak: 4 },
    { name: "Sachin", points: 600, streak: 3 },
  ],
  "Tamil Nadu": [
    { name: "Vijay", points: 1050, streak: 9 },
    { name: "Arun", points: 980, streak: 5 },
    { name: "Rahul", points: 900, streak: 4 },
    { name: "Neha", points: 800, streak: 3 },
    { name: "Sachin", points: 700, streak: 2 },
  ],
};

const stateCenters = {
  Delhi: [77.17880168381647, 28.58661157360987],
  Maharashtra: [19.7515, 75.7139],
  Karnataka: [15.3173, 75.7139],
  "Tamil Nadu": [11.1271, 78.6569],
};

const stateData = [
  { state: "Karnataka", emissions: 888.86, coordinates: [[77.4481, 18.1205], [74.4290, 15.7675], [76.4417, 11.9140], [76.8331, 15.2827]] },
  { state: "Maharashtra", emissions: 936.7, coordinates: [[72.7247, 20.0357], [77.2969, 21.6068], [76.4094, 17.8564], [73.8355, 16.2413]] },
  { state: "Tamil Nadu", emissions: 985.7, coordinates: [[77.1492, 8.2872], [79.5395, 10.4915], [80.1111, 13.4395], [77.2531, 11.6602]] },
  { state: "Delhi", emissions: 5000, coordinates: [[77.1025, 28.7041], [77.2310, 28.5355], [76.8260, 28.6140], [77.2150, 28.6139]] },
];

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState("");
  const [carbonStats, setCarbonStats] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [mapCenter, setMapCenter] = useState([22.3511, 78.6677]); // Default center
  const navigate = useNavigate();

  useEffect(() => {
    const userState = localStorage.getItem("userState");
    if (!userState) {
      navigate("/");
      return;
    }
    setSelectedState(userState);
    setCarbonStats(carbonData[userState] || {});
    setLeaderboard(leaderboardData[userState] || []);

    // ✅ Set the map center if the state exists
    if (stateCenters[userState]) {
      setMapCenter(stateCenters[userState]);
    }
  }, [navigate]);

  const getColor = (emissions) => {
    return emissions > 2000 ? "#ff0000" :
           emissions > 1000 ? "#ff6600" :
           emissions > 500  ? "#ffcc00" :
           "#33cc33";
  };

  return (
    <div  className="   h-[88.6%]">
      <NavBar />
      <LeftBar />
      <div  className="w-[100%] h-[100%]">
        <h1 className="text-2xl font-bold px-5 pt-5 ml-[21%]">Dashboard - {selectedState}</h1>
        <div className="flex gap-4 pl-[21%] w-[100%] h-[30%] p-10 ">
          <div id="stat-box" className="w-[340px] h-[120px] p-4 bg-slate-300">
            <h3 className="font-bold text-2xl">Total CO₂</h3>
            <p>{carbonStats.total} kg CO₂</p>
          </div>
          <div id="stat-box" className="w-[340px] h-[120px] p-4 bg-slate-300">
            <h3 className="font-bold text-2xl">Average CO₂</h3>
            <p>{carbonStats.average} kg CO₂</p>
          </div>
          <div id="stat-box" className="w-[340px] h-[120px] p-4 bg-slate-300">
            <h3 className="font-bold text-2xl">Lowest of the Month</h3>
            <p>{carbonStats.lowest} kg CO₂</p>
          </div>
          <div id="leaderboard-container" className="w-[380px] h-[500px] p-5 bg-slate-300">
            <h3 className="font-bold">Top 5 Leaderboard</h3>
            <ul>
              {leaderboard.map((user, index) => (
                <li key={index} className="border-t py-6 p-2">
                  {index + 1}. {user.name} - {user.points} 🏆 {user.streak} 🔥
                </li>
              ))}
              <Link to="/Game" id="play-game-btn" className="bg-blue-500 p-2 text-white">
                Play Game
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex gap-4 pl-[21%] w-[100%] h-[30%]">
          <div id="map-container" className="w-[850px] h-[350px] bg-slate-300">
            <MapContainer center={mapCenter} zoom={5} style={{ width: "100%", height: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {stateData.map((state, index) => (
                <Polygon key={index} pathOptions={{ color: getColor(state.emissions), weight: 2, fillOpacity: 0.6 }} positions={state.coordinates.map(coord => [coord[1], coord[0]])}>
                  <Tooltip>{state.state}: {state.emissions} kg CO₂</Tooltip>
                </Polygon>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
