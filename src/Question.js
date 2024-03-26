import React from 'react';
import './Question.css';
function Question({ question, choices, onSelect }) {
  return (
    <div>
      <h3>{question}</h3>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => onSelect(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
}

export default Question;
