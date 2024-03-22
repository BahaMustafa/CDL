// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure App.css is imported if it's not already globally available

function Home() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to the CDL Quiz App</h1>
        <p className="App-subtitle">Get ready to test your knowledge and prepare for your CDL exam.</p>
        <button className="start-button" onClick={() => navigate('/test')}>
          Start Test
        </button>
      </header>
    </div>
  );
}

export default Home;
