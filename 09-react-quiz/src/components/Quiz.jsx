import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    // Questions and Answers State Management
    const [userAnswers, setUserAnswers] = useState([]);

    // If answerState is an empty string (question not answered), stay on the current index (question)
    // If answerState is not an empty string (question is answered), change length to 1 previous to stay on current question
    // This is to allow changing the style of the answered button, to show user if answer is correct or incorrect before next question appears
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
            <Summary userAnswers={userAnswers} />
        );
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}