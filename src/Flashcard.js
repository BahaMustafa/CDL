import React, { useState } from 'react';

function Flashcard({ question, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    onFlip();
  };

  return (
    <div className="Flashcard" onClick={flipCard}>
      {isFlipped ? (question?.answer || 'No answer') : (question?.question || 'No question')}
    </div>
  );
}


export default Flashcard;
