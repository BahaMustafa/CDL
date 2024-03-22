import React from 'react';


function Feedback({ isCorrect }) {
  return (
    <div
      style={{
        color: isCorrect ? 'green' : 'red',
        transition: 'all 0.5s ease',
      }}
    >
      {isCorrect ? <p>✅ Correct!</p> : <p>❌ Incorrect. Try again!</p>}
    </div>
  );
}

export default Feedback;
