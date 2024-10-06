import { useState, useCallback } from "react";

import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from '../questions.js';

export default function Quiz() {
    // Questions and Answers State Management
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);

    // If answerState is an empty string (question not answered), stay on the current index (question)
    // If answerState is not an empty string (question is answered), change length to 1 previous to stay on current question
    // This is to allow changing the style of the answered button, to show user if answer is correct or incorrect before next question appears
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    // Quiz is complete
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    // Function to handle the selected answer
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            // Nested timeout, to show the user if their answer is correct or wrong before moving onto next question
            // Reset answerState back to empty string
            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000)
    }, [activeQuestionIndex]);

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
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        // Setup CSS class for showing when the button has been selected
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = '';
                        if (answerState === 'answered' && isSelected) {
                            cssClass = 'selected'
                        }

                        if ((answerState === 'correct') || (answerState === 'wrong') && isSelected) {
                            cssClass = answerState;
                        }


                        return <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                                {answer}
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}