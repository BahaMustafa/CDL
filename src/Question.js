import React from 'react';
import './Question.css';

function Question({ question, choices, onSelect, userAnswer, correctAnswer }) {
  return (
    <div>
      <h3>{question}</h3>
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onSelect(choice)}
          className={
            // Highlight if the current choice is the correct answer and the user's answer is incorrect
            userAnswer && choice === correctAnswer && userAnswer !== correctAnswer ? 'correct-answer' : ''
          }
        >
          {choice}
        </button>
      ))}
    </div>
  );
}

export default Question;
