import React from 'react';
import { motion } from 'framer-motion';

function Question({ question, choices, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>{question}</h3>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => onSelect(choice)}>
          {choice}
        </button>
      ))}
    </motion.div>
  );
}

export default Question;
