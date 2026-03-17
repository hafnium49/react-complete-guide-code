import { useState } from 'react';
import Header from './components/Header/Header';
import UserInput from './components/UserInput/UserInput';
import ResultsTable from './components/ResultsTable/ResultsTable';

function App() {
  /*
    TUTOR'S GUIDANCE:
    "Lifting State Up"
    We define our base state here at the nearest common ancestor of our components. 
    By setting this initially to `null`, we know exactly when to render our fallback UI!
  */
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    /*
      TUTOR'S GUIDANCE:
      Rather than trapping all of the logic inside this event handler, we keep it incredibly lean.
      We only use it strictly to catch the user input lifted up from our `UserInput` child component 
      and inject it into our App-level state.
    */
    setUserInput(userInput);
  };

  /*
    TUTOR'S GUIDANCE:
    "Derived State"
    Instead of manually setting `yearlyData` into its own `useState` instance (causing redundant renders), 
    we let it generate dynamically right here in the component body during every render *if* input data exists!
  */
  const yearlyData = []; 

  if (userInput) {
    let currentSavings = +userInput['current-savings']; 
    const yearlyContribution = +userInput['yearly-contribution']; 
    const expectedReturn = +userInput['expected-return'] / 100; 
    const duration = +userInput['duration']; 

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />

      {/*
        TUTOR'S GUIDANCE:
        Here we pass down our incredibly lean `calculateHandler` under the custom `onCalculate` prop. 
        When the internal `<form>` is submitted within UserInput, this function catches that payload!
      */}
      <UserInput onCalculate={calculateHandler} />

      {/* 
        TUTOR'S GUIDANCE:
        "Conditional Rendering"
        If there is no user input state yet (i.e. it's null), we show a fallback paragraph.
        Otherwise, we output the beautiful ResultsTable, passing down our derived data array 
        and the initial investment base reference via props so the table can crunch the final numbers!
      */}
      {!userInput && <p style={{ textAlign: 'center' }}>No investment calculated yet.</p>}
      {userInput && (
        <ResultsTable 
          data={yearlyData} 
          initialInvestment={userInput['current-savings']} 
        />
      )}
    </div>
  );
}

export default App;
