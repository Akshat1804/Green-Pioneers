import React from "react";
import { Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar";
import Dashboard from "./Pages/Dashboard";
import AuthPage from "./Auth/AuthPage";
import Quiz from "./Pages/Quiz";
import Game from "./Pages/game";
import ProjectCollab from "./Pages/ProjectCollab";
import Map from "./Pages/Map";
import Calculator from "./Pages/Calculator";
import { StreakPointsProvider } from "./Context/StreakPointsContext";
import EcoScore from "./Pages/EcoScore";
import Tracker from "./Pages/Tracker";
import AutomatedReminders from "./Pages/AutomatedReminders";
import BarcodeScanner from "./Pages/Scanner";

const App = () => {
  return (
    <div className="h-screen">
      <StreakPointsProvider>
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Project" element={<ProjectCollab />} />
          <Route path="/EcoScore" element={<EcoScore />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Calculator" element={<Calculator />} />
          <Route path="/Tracker" element={<Tracker />} />
          <Route path="/Reminder" element={<AutomatedReminders />} />
          <Route path="/Scanner" element={<BarcodeScanner />} />
        </Routes>
      </StreakPointsProvider>
    </div>
  );
};

export default App;
