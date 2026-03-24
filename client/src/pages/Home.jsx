import React, { useRef, useState } from "react";
import "../style/Home.css";
import { myTopics } from "../data/topics";
import useSound from "use-sound";
import Sfx from "../../src/sounds/tres-sound.mp3";

const Home = () => {
  const [currentTopic, setCurrentTopic] = useState("Generate A Topic");
  const [isSpeechVisible, setSpeechVisible] = useState(false);
  const [isBrainStormVisible, setBrainStormVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeLeft2, setTimeLeft2] = useState(180);
  const timerRef = useRef(null);

  const [playTimeOver] = useSound(Sfx, {
    volume: 0.25,
    duration: 1500,
  });

  const generateTopic = (e) => {
    e.preventDefault();

    setCurrentTopic("[...]");

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * myTopics.length);
      setCurrentTopic(myTopics[randomIndex]);
    }, 500);
  };

  const startBrainstormTimer = (e) => {
    e.preventDefault();

    if (!isBrainStormVisible) {
      setBrainStormVisible(true);
      setTimeLeft(60);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            playTimeOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBrainStormVisible(false);
      clearInterval(timerRef.current);
    }
  };

  const startSpeechTimer = (e) => {
    e.preventDefault();

    if (!isSpeechVisible) {
      setSpeechVisible(true);
      setTimeLeft2(180);

      timerRef.current = setInterval(() => {
        setTimeLeft2((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            playTimeOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setSpeechVisible(false);
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
        <button onClick={startBrainstormTimer}>
          {isBrainStormVisible ? "hide brainstorm timer" : "brainstorm timer"}
        </button>
        <button onClick={startSpeechTimer}>
          {isSpeechVisible ? "hide speech timer" : "speech timer"}
        </button>
      </div>
      {/*  */}
      {isBrainStormVisible && (
        <div className="timer-container">
          <h3>{formatTime(timeLeft)}</h3>
        </div>
      )}

      {isSpeechVisible && (
        <div className="timer-container">
          <h3>{formatTime(timeLeft2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Home;
