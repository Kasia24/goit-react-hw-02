import React, { useState, useEffect } from "react";
import Description from "./Description/Description";
import Feedback from "./Feedback/Feedback";
import Options from "./Options/Options";
import Notification from "./Notification/Notification";

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  useEffect(() => {
    try {
      const savedFeedback = JSON.parse(localStorage.getItem("feedback"));
      if (savedFeedback) {
        setFeedback(savedFeedback);
      }
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const calculateTotalFeedback = (feedback) =>
    feedback.good + feedback.neutral + feedback.bad;

  const calculatePositivePercentage = (feedback) => {
    const total = calculateTotalFeedback(feedback);
    return total > 0 ? Math.round((feedback.good / total) * 100) : 0;
  };

  const totalFeedback = calculateTotalFeedback(feedback);
  const positivePercentage = calculatePositivePercentage(feedback);

  return (
    <div>
      <Description />

      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback given yet." />
      )}
    </div>
  );
};

export default App;
