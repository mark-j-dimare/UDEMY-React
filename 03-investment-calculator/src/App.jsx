import { useState } from 'react';
import Header from './components/Header/Header.jsx';
import UserInput from './components/UserInput/UserInput.jsx';
import Results from './components/Results/Results.jsx';

function App() {
  // Lifting the state up
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const inputIsValid = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue
      };
    });
  };

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {inputIsValid && <Results userInput={userInput} />}
      {!inputIsValid && <p className="center">Please enter a duration greater than zero.</p>}
    </>
  )
}

export default App
