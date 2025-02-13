import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";

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
                <MealItem key={meal.id} meal={meal} />
            ))};
        </ul>
    );
}