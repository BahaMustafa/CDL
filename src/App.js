import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Test from './Test';
import './App.css';

freturn (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        {/* ... other routes */}
      </Routes>
    </div>
  </Router>
);
}

export default App;
