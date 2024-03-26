// src/Footer.js
import React from 'react';
import './Footer.css';

function Footer({ passCount }) {
  // For demonstration purposes, the passCount is hard-coded.
  // In a real application, passCount would be retrieved from your app's backend.
  const passedCount = 256; // Example count of people who have passed.

  return (
    <footer className="footer">
      <div className="footer-stats">
        <span>{passedCount} people have passed the test!</span>
      </div>
      <div className="footer-contact">
        <span>Contact us: <a href="mailto:bhaatobase93@gmail.com">support@cdlquizapp.com</a></span>
      </div>
      <div className="footer-rights">
        <span>&copy; {new Date().getFullYear()} CDL Quiz App. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
