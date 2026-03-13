import React, { useRef, useState } from "react";
import "../style/Home.css";
import { myTopics } from "../data/topics";

const Home = () => {
  const [currentTopic, setCurrentTopic] = useState("Generate A Topic");
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);

  const generateTopic = (e) => {
    e.preventDefault();

    setCurrentTopic("[...]");

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * myTopics.length);
      setCurrentTopic(myTopics[randomIndex]);
    }, 500);
  };

  const startTimer = (e) => {
    e.preventDefault();

    if (!isVisible) {
      setIsVisible(true);
      setTimeLeft(60);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setIsVisible(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="generator-container">
      <h1 className="topic">{currentTopic}</h1>
      {/*  */}
      <div className="button-container">
        <button onClick={generateTopic}>generate topic</button>
        <button onClick={startTimer}>
          {isVisible ? "hide timer" : "start timer"}
        </button>
      </div>
      {/*  */}
      {isVisible && (
        <div className="timer-container">
          <h3>{formatTime(timeLeft)}</h3>
        </div>
      )}
    </div>
  );
};

export default Home;
