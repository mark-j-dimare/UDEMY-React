import { useState, useCallback } from "react";

import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from '../questions.js';

export default function Quiz() {
    // Questions and Answers State Management
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    // Quiz is complete
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    // Function to handle the selected answer
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null), [handleSelectAnswer]
    });

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Quiz is complete" />
                <h2>Quiz Complete!</h2>
            </div>
        );
    }

    // Create a new answers array to not edit the original, since the first answer is correct in the data
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}