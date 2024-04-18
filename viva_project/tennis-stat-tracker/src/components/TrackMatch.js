import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrackMatch.css'; // Import component-specific styles
import { postMatchData } from '../api/api'; // Import the postMatchData function from the API

function TrackMatch({ addMatchData }) {
  const navigate = useNavigate();
  const [stage, setStage] = useState('pointType');
  const [points, setPoints] = useState([]); // Holds all points for the current match
  const [pointDetails, setPointDetails] = useState({ type: '', outcome: '', reason: '' });
  const [matchOutcome, setMatchOutcome] = useState(''); // Holds the overall match outcome

  const handleSelection = (key, value) => {
    if (key === 'reason') {
      const completedPoint = { ...pointDetails, [key]: value };
      setPoints([...points, completedPoint]); // Add the completed point to the points array
      setPointDetails({ type: '', outcome: '', reason: '' }); // Reset for the next point
      setStage('logFinish'); // Move to the next stage
    } else {
      setPointDetails({ ...pointDetails, [key]: value }); // Update point details
      const nextStage = key === 'type' ? 'outcome' : 'reason';
      setStage(nextStage); // Move to the next stage
    }
  };

  const logPoint = () => {
    setPointDetails({ type: '', outcome: '', reason: '' }); // Reset point details for a new point
    setStage('pointType'); // Set the stage to allow logging of a new point
  };

  const handleBack = () => {
    // Handle going back from the current stage
    if (stage === 'outcome') {
      setStage('pointType');
    } else if (stage === 'reason') {
      setStage('outcome');
    } else if (stage === 'logFinish') {
      if (points.length > 0) {
        setStage('reason');
        const lastPoint = points[points.length - 1];
        setPointDetails(lastPoint); // Restore the last point details
        setPoints(points.slice(0, -1)); // Remove the last point
      } else {
        setStage('pointType');
      }
    }
  };

  const finishMatch = () => {
    setStage('matchOutcome'); // Transition to selecting the match outcome
  };

  const handleMatchOutcome = async (outcome) => {

    console.log('Outcome being posted:', outcome); 

    const matchData = {
      points: points,
      matchOutcome: outcome
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/matches/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(matchData)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to post match data: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      alert('Match data successfully saved!'); // Provide a success message to the user
      navigate('/'); // Navigate after successful post
    } catch (error) {
      console.error('Error posting match data:', error);
      alert('Error posting match data: ' + error.message); // Display error to the user
    }
  };  
  

  // Dynamically determine reason options based on point type and outcome
  const reasonOptions = () => {
    if (pointDetails.type === 'service') {
      return pointDetails.outcome === 'won'
        ? ['Ace/unreturned', 'Winner/Forced Error', 'Opponent Unforced Error']
        : ['Double fault', 'Winner/Forced Error by Opponent', 'Unforced Error'];
    } else {
      return pointDetails.outcome === 'won'
        ? ['Opponent Double Fault', 'Winner/Forced Error', 'Opponent Unforced Error']
        : ['Opponent Ace/Unreturned Serve', 'Winner/Forced Error by Opponent', 'Unforced Error'];
    }
  };

  return (
    <div className="track-match">
      <h2>Track Match</h2>

      {stage === 'pointType' && (
        <>
          <button onClick={() => handleSelection('type', 'service')}>Service Point</button>
          <button onClick={() => handleSelection('type', 'return')}>Return Point</button>
        </>
      )}
      {stage === 'outcome' && (
        <>
          <button onClick={() => handleSelection('outcome', 'won')}>Won</button>
          <button onClick={() => handleSelection('outcome', 'lost')}>Lost</button>
        </>
      )}
      {stage === 'reason' && reasonOptions().map((reason, index) => (
        <button key={index} onClick={() => handleSelection('reason', reason)}>{reason}</button>
      ))}
      {stage === 'logFinish' && (
        <>
          <button onClick={logPoint}>Log Another Point</button>
          <button onClick={finishMatch}>Finish Match</button>
        </>
      )}
      {stage === 'matchOutcome' && (
        <>
          <h3>Did you win or lose the match?</h3>
          <button onClick={() => handleMatchOutcome('won')}>Won</button>
          <button onClick={() => handleMatchOutcome('lost')}>Lost</button>
        </>
      )}
      {stage !== 'pointType' && stage !== 'matchOutcome' && (
        <div style={{ marginTop: '10px' }}>
          <hr></hr>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
    </div>
  );
}

export default TrackMatch;
