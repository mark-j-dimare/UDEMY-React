import { useState, useEffect } from "react";

export default function Meals() {
    // manage meals state
    // starts empty, setLoadedMeals becomes meals after fetchMeals happens
    const [loadedMeals, setLoadedMeals] = useState([]);

    // create function to fetch the meals data
    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');

            if (!response.ok) {
                // ...
            }

            const meals = await response.json();
            setLoadedMeals(meals);
        }

        fetchMeals();
    }, []);


    return (
        <ul id="meals">

            {loadedMeals.map(meal => (
                <li key={meal.id}>{meal.name}</li>
            ))}
        </ul>
    )
}