import React, { useState } from "react";
import "../style/Home.css";
import { myTopics } from "../data/topics";

const Home = () => {
  const [currentTopic, setCurrentTopic] = useState("Generate A Topic");

  const generateTopic = (e) => {
    e.preventDefault();

    setCurrentTopic("[...]");

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * myTopics.length);
      setCurrentTopic(myTopics[randomIndex]);
    }, 500);
  };

  return (
    <div className="generator-container">
      <h1 className="topic">{currentTopic}</h1>
      <div className="button-container">
        <button onClick={generateTopic}>generate topic</button>
        <button>start timer</button>
      </div>
    </div>
  );
};

export default Home;
