// src/Test.js
import React, { useState, useEffect, useCallback } from 'react';
import Question from './Question';
import Feedback from './Feedback';
import { motion } from 'framer-motion'; // Ensure this is correctly imported if used
import './Test.css'
function Test() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [selectedTest, setSelectedTest] = useState('test1');
  const [testCompleted, setTestCompleted] = useState(false);
  const [shuffleEnabled, setShuffleEnabled] = useState(true); // New state for shuffle button
  const [isShuffleActive, setIsShuffleActive] = useState(false);

  const handleShuffleToggle = () => {
    setIsShuffleActive(!isShuffleActive);
  };
  // Shuffle the questions and choices
  function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]]; // Swap elements
    }
    return result;
  }
  
  

  // Function to shuffle questions and choices
  const shuffleQuestionsAndChoices = useCallback(() => {
    if (isShuffleActive) {
      setQuestions(currentQuestions => {
        return shuffleArray(currentQuestions).map(question => ({
          ...question,
          choices: shuffleArray(question.choices)
        }));
      });
    }
  }, [isShuffleActive]); 

  useEffect(() => {
    const savedIndex = sessionStorage.getItem('currentQuestionIndex');
    if (savedIndex) {
      setCurrentQuestionIndex(parseInt(savedIndex, 10));
      setShuffleEnabled(false); // Disable shuffle if continuing a test
    }

    fetch(`${process.env.PUBLIC_URL}/${selectedTest}.json`)
    .then(response => response.json())
    .then(data => {
      let questionsData = data;
      if (isShuffleActive) {
        questionsData = shuffleArray(data).map(question => ({
          ...question,
          choices: shuffleArray(question.choices)
        }));
      }
      setQuestions(questionsData);
    })
    .catch(error => console.error('Error fetching questions:', error));
}, [selectedTest, isShuffleActive]);

  useEffect(() => {
    sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    if (currentQuestionIndex > 0) {
      setShuffleEnabled(false); // Disable shuffle once the test has started
    }
  }, [currentQuestionIndex]);

  const handleChoiceSelect = (choice) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    setIsCorrect(choice === correctAnswer);
    if (choice === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    } else {
      setIncorrectAnswers(prevIncorrect => prevIncorrect + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setIsCorrect(null);
    } else {
      setTestCompleted(true);
      alert(`Test completed. Score: ${score}, Incorrect Answers: ${incorrectAnswers}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleRestartTest = () => {
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIncorrectAnswers(0);
    setIsCorrect(null);
    setShuffleEnabled(true); // Enable shuffle on restart
    shuffleQuestionsAndChoices();
  };
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
          className="question"
          question={questions[currentQuestionIndex].question}
          choices={questions[currentQuestionIndex].choices}
          onSelect={handleChoiceSelect}
          isCorrect={isCorrect}
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
