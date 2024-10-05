import { useState } from "react";

export default function Quiz() {
    // Questions and Answers State Management
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    return (
        <p>Currently Active Question</p>
    )
}