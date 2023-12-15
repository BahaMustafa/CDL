import React from 'react';

function Feedback({ isCorrect }) {
  return (
    <div>
      {isCorrect ? <p>Correct!</p> : <p>Incorrect. Try again!</p>}
    </div>
  );
}

export default Feedback;
