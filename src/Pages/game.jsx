import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button2 from "../Ui/Button2"; // ✅ Correct import
import Progress from "../Ui/Progress";
import { useStreakPoints } from "../Context/StreakPointsContext"; // Import useStreakPoints
import LeftBar from "../components/LeftBar";
import { div } from "@tensorflow/tfjs";
import NavBar from "../components/NavBar";

export default function Game() {
  const { streak, points, increaseStreak, increasePoints } = useStreakPoints(); // Get streak and functions from context
  const [happiness, setHappiness] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [ecoActions, setEcoActions] = useState(0);
  const [story, setStory] = useState(
    "Your tiny turtle, Terra, has just hatched in a world struggling with pollution. Help Terra grow by making sustainable choices!"
  );
  const [goals, setGoals] = useState([
    "Reduce plastic waste",
    "Use public transport",
    "Save electricity",
    "Plant a tree",
    "Use a reusable water bottle",
    "Compost food waste",
    "Participate in a cleanup drive",
    "Switch to energy-efficient bulbs",
    "Reduce water usage while brushing",
    "Support sustainable brands",
  ]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [tasksToday, setTasksToday] = useState(0); // Track number of tasks completed today

  useEffect(() => {
    // Get the current date and compare with the last date stored in localStorage
    const lastCompletedDate = localStorage.getItem("lastCompletedDate");
    const currentDate = new Date().toLocaleDateString();

    if (lastCompletedDate !== currentDate) {
      // It's a new day, reset the tasks count
      localStorage.setItem("tasksToday", 0);
      setTasksToday(0);
    } else {
      // Load the tasks count from localStorage if it's the same day
      setTasksToday(Number(localStorage.getItem("tasksToday")));
    }
  }, []);

  const logEcoAction = (goal) => {
    setEcoActions((prev) => prev + 1);
    setHappiness((prev) => Math.min(prev + 10, 100));
    setEnergy((prev) => Math.min(prev + 5, 100));
    setCompletedGoals([...completedGoals, goal]);
    updateStory();

    // Reward 40 points after completing an action
    increasePoints(40);

    // Increase task count for the day
    let updatedTasks = tasksToday + 1;
    setTasksToday(updatedTasks);
    localStorage.setItem("tasksToday", updatedTasks);

    // Check if 3 tasks are completed and increase streak
    if (updatedTasks >= 3) {
      increaseStreak();
      localStorage.setItem("lastCompletedDate", new Date().toLocaleDateString()); // Save the current date
      localStorage.setItem("tasksToday", 0); // Reset task count after streak increase
      setTasksToday(0); // Reset task counter for the day
    }
  };

  const updateStory = () => {
    if (ecoActions > 10) {
      setStory(
        "Terra has grown strong and wise! Thanks to your eco-friendly efforts, the world around Terra is now greener and thriving."
      );
    } else if (ecoActions > 5) {
      setStory(
        "Terra is getting bigger! The air is cleaner, and the plants are flourishing as you continue your sustainable journey."
      );
    }
  };

  return (
    <div >
      <NavBar />
<LeftBar/>
    <div className="flex w-[70%] ml-[23%]  flex-col items-center p-6    ">
      <motion.div
        animate={{ scale: 1 + ecoActions * 0.05, rotate: ecoActions > 5 ? 10 : 0 }}
        className="text-6xl"
      >
        {ecoActions > 10 ? "🌿🐢" : ecoActions > 5 ? "🌱🐢" : "🐢"}
      </motion.div>

      <p className="mt-4 text-center text-sm italic">{story}</p>

      <div className="mt-4 w-full">
        <p className="text-sm">Happiness</p>
        <Progress value={happiness} />
      </div>
      <div className="mt-2 w-full">
        <p className="text-sm">Energy</p>
        <Progress value={energy} />
      </div>
      <div className="mt-2 w-full">
        <p className="text-sm">Eco Actions Logged: {ecoActions}</p>
      </div>

      <div className="mt-4 w-full">
        <p className="text-sm">Set Your Eco Goals:</p>
        <ul>
          {goals.map((goal, index) => (
            <li key={index} className="flex justify-between items-center mt-2">
              <span>{goal}</span>
              <button
                onClick={() => logEcoAction(goal)} // When clicked, call logEcoAction and pass the goal
                className="bg-[#036406] hover:bg-green-600 text-white text-xs p-2 rounded"
              >
                Complete ✅
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Button2 /> {/* ✅ Correct usage */}
      </div>
    </div>
    </div>

  );
}
