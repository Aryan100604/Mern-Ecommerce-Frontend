import { useState } from "react";

const ScoreBoard = () => {
  const [run, setRun] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [message, setMessage] = useState("");
  const IncrementRun = () => {
    if (wicket < 11) {
      setRun(run + 1);
      setMessage("Well Done");
    }
  };
  const IncrementWicket = () => {
    if (wicket < 11) {
      setWicket(wicket + 1);
      setMessage("Better Luck Next Time");
    }
  };

  return (
    <div className="ScoreBoard">
      <div>
        {run}/{wicket}
      </div>
      <button onClick={IncrementRun}>Increase Run</button>
      <button onClick={IncrementWicket}>Increase wicket</button>
      <p>{message}</p>
    </div>
  );
};

export default ScoreBoard;
