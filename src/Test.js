// src/Test.js
import React, { useState, useEffect, useCallback } from 'react';
import Question from './Question';
import Feedback from './Feedback';
import './Test.css';

// This function is moved outside the component as it does not depend on component's state or props.
function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]; // Swap elements
  }
  return result;
}

function Test() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [selectedTest, setSelectedTest] = useState('test1');
  const [testCompleted, setTestCompleted] = useState(false);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [userSelectedAnswer, setUserSelectedAnswer] = useState(null);

  const handleShuffleToggle = () => setIsShuffleActive(!isShuffleActive);

  const shuffleQuestionsAndChoices = useCallback(() => {
    if (isShuffleActive) {
      setQuestions(currentQuestions => shuffleArray(currentQuestions).map(question => ({
        ...question,
        choices: shuffleArray(question.choices)
      })));
    }
  }, [isShuffleActive]);
  const handleRestartTest = () => {
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIncorrectAnswers(0);
    setIsCorrect(null);
    setIsShuffleActive(false); // Assuming you want to reset the shuffle state as well
    setUserSelectedAnswer(null); // Reset user's selected answer on restart
    shuffleQuestionsAndChoices(); // Only if shuffling is desired on restart
  };
  
    // Optionally, move to the next question or provide feedback here

    const handlePreviousQuestion = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        setIsCorrect(null);
        setQuestionAnswered(false); // Reset for the previous question
        setUserSelectedAnswer(null); // Also reset here
      }
    };
    
  
  // Example for handleNextQuestion
const handleNextQuestion = () => {
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setIsCorrect(null);
    setQuestionAnswered(false); // Reset for the next question
    setUserSelectedAnswer(null); // Also reset the selected answer
  } else {
    setTestCompleted(true);
  }
};

  
  const handleChoiceSelect = (choice) => {
    // Ignore any selections if the question has already been answered
    if (questionAnswered) return;
  
    setUserSelectedAnswer(choice); // Update the state with the user's selected answer
  
    const correctAnswer = questions[currentQuestionIndex].answer;
    const isAnswerCorrect = choice === correctAnswer;
  
    setIsCorrect(isAnswerCorrect); // Update the state to reflect if the answer is correct
  
    // Now, we ensure scoring happens only once by checking if the question hasn't been answered yet
    if (!questionAnswered) {
      if (isAnswerCorrect) {
        // If the answer is correct, increment the score
        setScore(prevScore => prevScore + 1);
      } else {
        // If the answer is incorrect, increment the incorrect answers count
        setIncorrectAnswers(prevIncorrect => prevIncorrect + 1);
      }
  
      // Mark the current question as answered to prevent multiple scoring
      setQuestionAnswered(true);
    }
  };
  
  
  useEffect(() => {
    const savedIndex = sessionStorage.getItem('currentQuestionIndex');
    if (savedIndex) {
      setCurrentQuestionIndex(parseInt(savedIndex, 10));
    }

    fetch(`${process.env.PUBLIC_URL}/${selectedTest}.json`)
      .then(response => response.json())
      .then(data => {
        let questionsData = isShuffleActive ? shuffleArray(data).map(question => ({
          ...question,
          choices: shuffleArray(question.choices)
        })) : data;
        setQuestions(questionsData);
      })
      .catch(error => {
        alert('Error fetching questions. Please try again later.'); // User-friendly error handling
        console.error('Error fetching questions:', error);
      });
  }, [selectedTest, isShuffleActive]);

  useEffect(() => {
    sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex);
  }, [currentQuestionIndex]);
  return (
    <div className="test-container">
  <h1 className="test-title">Test</h1>
  <div className="shuffle-container">
    <label className="shuffle-label">
      Shuffle Questions
      <input type="checkbox" className="shuffle-checkbox" checked={isShuffleActive} onChange={handleShuffleToggle} />
    </label>
  </div>
  <select className="test-select" onChange={(e) => setSelectedTest(e.target.value)}>
     < optgroup label="General Knowledge">
    <option value="GeneralKnowledge">General Knowledge</option>
    <option value="GeneralKnowledge1">General Knowledge 1</option>
    <option value="GeneralKnowledge2">General Knowledge 2</option>
    <option value="GeneralKnowledge3">General Knowledge 3</option>
    <option value="GeneralKnowledge4">General Knowledge 4</option>
    <option value="GeneralKnowledge5">General Knowledge 5</option>
    <option value="GeneralKnowledge6">General Knowledge 6</option>
    <option value="GeneralKnowledge7">General Knowledge 7</option>
  </optgroup>
  <optgroup label="Air Brakes">
    <option value="AirBrakes1">Air Brakes</option>
    <option value="AirBrakes2">Air Brakes 1</option>
    <option value="AirBrakes3">Air Brakes 2</option>
  </optgroup>
  <optgroup label="Combination">
    <option value="combination1">Combination</option>
    <option value="combination2">Combination 1</option>
    <option value="combination3">Combination 2</option>
    <option value="combination4">Combination 3</option>
  </optgroup>
      </select>

      {testCompleted ? (
    <div className="test-completion">
      <div className="test-results">Test completed. Score: {score}, Incorrect Answers: {incorrectAnswers}</div>
      <button className="restart-test-btn" onClick={handleRestartTest}>Restart Test</button>
    </div>
  ) : (
    <div className="test-ongoing">
      {questions.length > 0 && (
        <Question
        question={questions[currentQuestionIndex].question}
        choices={questions[currentQuestionIndex].choices}
        onSelect={handleChoiceSelect}
        userAnswer={userSelectedAnswer}
        correctAnswer={questions[currentQuestionIndex].answer}
      />
      )}
      <Feedback className="feedback" isCorrect={isCorrect} />
      <div className="navigation-btns">
        {currentQuestionIndex > 0 && <button className="previous-question-btn" onClick={handlePreviousQuestion}>Back</button>}
        {isCorrect !== null && <button className="next-question-btn" onClick={handleNextQuestion}>Next</button>}
      </div>
      <p className="score-display">Score: {score}</p>
      <p className="incorrect-answers-display">Incorrect Answers: {incorrectAnswers}</p>
    </div>
  )}
</div>
  );

}

export default Test;
