import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

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

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectAnswer}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}