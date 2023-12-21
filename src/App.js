import React, { useState, useEffect } from 'react';
import Question from './Question';
import Feedback from './Feedback';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [selectedTest, setSelectedTest] = useState('test1');
  const [testCompleted, setTestCompleted] = useState(false);

  // Shuffle the questions and choices
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const savedIndex = sessionStorage.getItem('currentQuestionIndex');
    if (savedIndex) {
      setCurrentQuestionIndex(parseInt(savedIndex, 10));
    }

    fetch(`${process.env.PUBLIC_URL}/${selectedTest}.json`)

      .then(response => response.json())
      .then(data => {
        const shuffledQuestions = shuffleArray(data).map(question => ({
          ...question,
          choices: shuffleArray(question.choices)
        }));
        setQuestions(shuffledQuestions);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [selectedTest]);

  useEffect(() => {
    sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex);
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
    // Optionally shuffle questions again
    setQuestions(shuffleArray(questions).map(question => ({
      ...question,
      choices: shuffleArray(question.choices)
    })));
  };

  return (
    <div className="App">
      <select onChange={(e) => setSelectedTest(e.target.value)}>
        <option value="test1">Test 1</option>
        <option value="test2">Test 2</option>
        <option value="test3">Test 3</option>
        <option value="airBrakes">Air Brakes</option>
        <option value="combination">Combination</option>
        <option value="GeneralKnowledge">General Knowledge</option>
        <option value="GeneralKnowledge1">General Knowledge1</option>
      </select>
      {testCompleted ? (
        <>
          <div>Test completed. Score: {score}, Incorrect Answers: {incorrectAnswers}</div>
          <button onClick={handleRestartTest}>Restart Test</button>
        </>
      ) : (
        <>
          {questions.length > 0 && (
            <Question
              question={questions[currentQuestionIndex].question}
              choices={questions[currentQuestionIndex].choices}
              onSelect={handleChoiceSelect}
              isCorrect={isCorrect}
            />
          )}
          <Feedback isCorrect={isCorrect} />
          <div>
            {currentQuestionIndex > 0 && <button onClick={handlePreviousQuestion}>Back</button>}
            {isCorrect !== null && <button onClick={handleNextQuestion}>Next</button>}
          </div>
          <p>Score: {score}</p>
          <p>Incorrect Answers: {incorrectAnswers}</p>
        </>
      )}
    </div>
  );
}

export default App;
