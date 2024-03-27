import React from 'react';


function Feedback({ isCorrect }) {
  return (
    <div
  style={{
    color: isCorrect ? 'green' : 'red',
    backgroundColor: isCorrect ? '#ebffeb' : '#ffebeb',
    padding: '10px',
    borderRadius: '5px',
    transition: 'all 0.5s ease',
    marginTop: '10px',
    textAlign: 'center',
    border: isCorrect ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
  }}
  aria-live="polite" // Add this for accessibility
>
  {isCorrect ? <p>✅ Correct!</p> : <p>❌ Incorrect. Try again!</p>}
</div>

  );
}

export default Feedback;
