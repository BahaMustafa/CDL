// Adjusted Home.js to include a Link component
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

function Home() {
  let navigate = useNavigate();

  return (
    <div className="background-container">
      <div className="home-container">
        <div className="content-overlay">
          <h1>Welcome to the CDL Quiz App</h1>
          <p>Get ready to test your knowledge and prepare for your CDL exam.</p>
          <button className="start-btn" onClick={() => navigate('/test')}>
            Start Writing Test
          </button>
          <Link to="/inspections" className="inspection-btn">
            Start Inspections
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
