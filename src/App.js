import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import Inspection from './Inspection';
import Footer from './Footer'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation bar */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/test">Test</Link></li>
            <li><Link to="/inspections">Inspections</Link></li>
            {/* Add more links as needed */}
          </ul>
        </nav>
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          {/* Assuming the Checklist and DetailPage functionality is integrated elsewhere */}
          <Route path="/inspections" element={<Inspection />} />
          {/* More routes as needed */}
          </Routes>
        <Footer  />
      </div>
    </Router>
  );
}

export default App;
