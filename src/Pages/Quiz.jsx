import React, { useState } from "react";
import { Button } from "../Ui/Button";
import { Card, CardContent } from "../Ui/Card";
import questions from "../components/questions";
import LeftBar from "../components/LeftBar";
import { useStreakPoints } from "../context/StreakPointsContext"; // Import context
import NavBar from "../components/NavBar";
import { div } from "@tensorflow/tfjs";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

  const { increasePoints, increaseStreak, streak } = useStreakPoints(); // Use context

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      increasePoints(10); // Award 10 points for each correct answer
      increaseStreak(); // Increase streak on correct answer
    } else {
      // Reset streak if the answer is incorrect
      localStorage.setItem("streak", 0);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizEnd(true);
    }
  };

  return (
    <div >
      <NavBar />
      <LeftBar />

      <div className="absolute top-[55%] left-[60%] w-[40%] h-full">
      <div className="flex flex-col  min-h-screen">
      <Card className="   -translate-x-1/2 -translate-y-1/2 w-full text-center p-6">
        <CardContent>
          {quizEnd ? (
            <div>
              <h2 className="text-xl font-bold">Your Score: {score}/{questions.length}</h2>
              <p className="text-lg">Total Points: {localStorage.getItem("points")}</p>
              
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold">{questions[currentQuestion].question}</h2>
              <div className="mt-4 flex flex-col gap-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button key={index} onClick={() => handleAnswer(option)}>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </div>
    </div>
    
   
  );
}
