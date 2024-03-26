import React from 'react';


function Feedback({ isCorrect }) {
  return (
    <div
  style={{
    color: isCorrect ? 'green' : 'red',
    backgroundColor: isCorrect ? '#ebffeb' : '#ffebeb', // Light green or red
    padding: '10px',
    borderRadius: '5px',
    transition: 'all 0.5s ease',
    marginTop: '10px', // Add some spacing from the question/answer
    textAlign: 'center', // Center the feedback text
    border: isCorrect ? '1px solid #c3e6cb' : '1px solid #f5c6cb', // Subtle border
  }}
>
  {isCorrect ? <p>✅ Correct!</p> : <p>❌ Incorrect. Try again!</p>}
</div>
  );
}

export default Feedback;
