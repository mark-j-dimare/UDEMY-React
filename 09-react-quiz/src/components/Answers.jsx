import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    // Create a new answers array to not edit the original, since the first answer is correct in the data
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                // Setup CSS class for showing when the button has been selected
                const isSelected = selectedAnswer === answer;
                let cssClass = '';
                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected'
                }

                if (
                    (answerState === 'correct' || answerState === 'wrong')
                    && isSelected
                ) {
                    cssClass = answerState;
                }

                return (
                    <li key={answer} className="answer">
                        <button
                            onClick={() => onSelect(answer)}
                            className={cssClass}
                            disabled={answerState !== ''}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}