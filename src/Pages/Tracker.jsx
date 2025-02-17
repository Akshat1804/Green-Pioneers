import React, { useState } from 'react';
import {
  Bike, Bus, Car, TreePine, ArrowRight, Leaf,
  Train, User, CloudRain, Calendar, TrendingUp, Target, History
} from 'lucide-react';
import { div } from '@tensorflow/tfjs';
import NavBar from '../components/NavBar';
import LeftBar from '../components/LeftBar';

function Tracker() {
  const [selectedMode, setSelectedMode] = useState('');
  const [distance, setDistance] = useState(5);
  const [journeyHistory, setJourneyHistory] = useState([]);
  const [weather, setWeather] = useState('sunny');
  const [monthlyGoal, setMonthlyGoal] = useState(500);

  const weatherImpact = {
    sunny: 1,
    rainy: 1.2,
    snowy: 1.4,
    windy: 1.1
  };

  const transportModes = [
    { icon: Car, mode: 'car', label: 'Car', baseEmission: 404 },
    { icon: Bus, mode: 'bus', label: 'Bus', baseEmission: 140 },
    { icon: Train, mode: 'train', label: 'Train', baseEmission: 80 },
    { icon: Bike, mode: 'bicycle', label: 'Bicycle', baseEmission: 0 },
    { icon: User, mode: 'walk', label: 'Walk', baseEmission: 0 }
  ];

  const calculateEmissions = (mode, dist, weatherCondition = 'sunny') => {
    const baseEmissions = transportModes.find(m => m.mode === mode)?.baseEmission || 0;
    const weatherMultiplier = weatherImpact[weatherCondition];
    return (baseEmissions * dist * weatherMultiplier).toFixed(1);
  };

  const calculateTreesNeeded = emissions => {
    return (emissions / 48000).toFixed(2);
  };

  const getTotalMonthlyEmissions = () => {
    const currentMonth = new Date().getMonth();
    return journeyHistory
      .filter(journey => new Date(journey.date).getMonth() === currentMonth)
      .reduce((total, journey) => total + journey.emissions, 0);
  };

  const getEmissionsByMode = () => {
    return transportModes.map(mode => ({
      mode: mode.mode,
      total: journeyHistory
        .filter(journey => journey.mode === mode.mode)
        .reduce((sum, journey) => sum + journey.emissions, 0)
    }));
  };

  const saveJourney = () => {
    if (!selectedMode) return;
    const emissions = Number(calculateEmissions(selectedMode, distance, weather));
    const newJourney = {
      mode: selectedMode,
      distance,
      date: new Date().toISOString(),
      emissions,
      weather
    };
    setJourneyHistory(prev => [...prev, newJourney]);
  };

  const getProgressToGoal = () => {
    const monthlyEmissions = getTotalMonthlyEmissions();
    const monthlyEmissionsInKg = monthlyEmissions / 1000;
    const progress = (monthlyEmissionsInKg / monthlyGoal) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div>
        <NavBar />
        <LeftBar/>
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container pl-[21%] mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800">Advanced Green Transit Tracker</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Plan Your Journey</h2>
            <input
              type="range"
              min="1"
              max="50"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg"
            />
            <span className="block text-center mt-2">{distance} miles</span>

            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full p-2 border rounded-lg mt-4"
            >
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
              <option value="snowy">Snowy</option>
              <option value="windy">Windy</option>
            </select>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {transportModes.map(({ icon: Icon, mode, label }) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`p-3 rounded-lg border-2 ${selectedMode === mode ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="block text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={saveJourney}
              disabled={!selectedMode}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg mt-4"
            >
              Save Journey
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Real-time Impact</h2>
            {selectedMode && (
              <div className="text-2xl font-bold text-gray-900">
                {calculateEmissions(selectedMode, distance, weather)}g CO2
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Monthly Analytics</h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Goal Progress</span>
                <span className="text-sm text-gray-600">
                  {(getTotalMonthlyEmissions()/1000).toFixed(1)}kg / {monthlyGoal}kg
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${getProgressToGoal()}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  );
}

export default Tracker;
