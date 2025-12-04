import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, secondsLeft]);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(60);
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
      <h2>Tiempo restante: {secondsLeft}s</h2>

      <button onClick={toggleRunning}>
        {isRunning ? "Pause" : "Start"}
      </button>

      <button onClick={resetTimer} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
}
