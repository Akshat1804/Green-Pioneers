import React, { createContext, useContext, useState, useEffect } from "react";

const StreakPointsContext = createContext();

export const useStreakPoints = () => useContext(StreakPointsContext);

export const StreakPointsProvider = ({ children }) => {
  const [streak, setStreak] = useState(() => {
    const storedStreak = localStorage.getItem("streak");
    return storedStreak ? Number(storedStreak) : 0;
  });
  const [points, setPoints] = useState(() => {
    const storedPoints = localStorage.getItem("points");
    return storedPoints ? Number(storedPoints) : 0;
  });

  // Update local storage whenever streak or points change
  useEffect(() => {
    localStorage.setItem("streak", streak);
    localStorage.setItem("points", points);
  }, [streak, points]);

  const increaseStreak = () => setStreak(streak + 1);
  const increasePoints = (newPoints) => setPoints(points + newPoints);

  return (
    <StreakPointsContext.Provider value={{ streak, points, increaseStreak, increasePoints }}>
      {children}
    </StreakPointsContext.Provider>
  );
};
