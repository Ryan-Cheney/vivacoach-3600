import React, { useState, useEffect } from "react";
import TrackMatch from "./components/TrackMatch";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./global.css"; // Import global styles

function HomeScreenButton({ label, navigateTo }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(navigateTo)} className="home-button">
      {label}
    </button>
  );
}

function App() {
  const [matchData, setMatchData] = useState([]);

  const addMatchData = (match) => {
    setMatchData((prev) => [...prev, match]);
  };

  // Update statistics calculations to iterate over points in each match
  const totalMatchesPlayed = matchData.length;
  const matchWins = matchData.filter(
    (match) => match.matchOutcome === "won"
  ).length;
  const matchWinPercentage = totalMatchesPlayed
    ? ((matchWins / totalMatchesPlayed) * 100).toFixed(2)
    : 0;
  const totalPoints = matchData.reduce(
    (acc, match) => acc + match.points.length,
    0
  );
  const pointWins = matchData.reduce(
    (acc, match) =>
      acc + match.points.filter((point) => point.outcome === "won").length,
    0
  );
  const pointWinPercentage = totalPoints
    ? ((pointWins / totalPoints) * 100).toFixed(2)
    : 0;
  const totalAces = matchData.reduce(
    (acc, match) =>
      acc +
      match.points.filter(
        (point) => point.type === "service" && point.reason === "Ace/unreturned"
      ).length,
    0
  );
  const acesPerMatch = totalMatchesPlayed
    ? (totalAces / totalMatchesPlayed).toFixed(2)
    : 0;

  return (
    <Router>
      <h1>VIVA Coach</h1>
      <div className="App app-container">
        <Routes>
          <Route
            path="/track-match"
            element={<TrackMatch addMatchData={addMatchData} />}
          />
          <Route
            path="/"
            element={
              <div className="dashboard">
                <div className="card">
                  Total Matches Played: {totalMatchesPlayed}
                </div>
                <div className="card">Match Win %: {matchWinPercentage}%</div>
                <div className="card">Point Win %: {pointWinPercentage}%</div>
                <div className="card">Aces per Match: {acesPerMatch}</div>
                {/* Implement logic and UI for displaying top reasons */}
              </div>
            }
          />
        </Routes>
      </div>
      <br></br>
      <HomeScreenButton label="Track New Match" navigateTo="/track-match" />
    </Router>
  );
}

export default App;
