import logo from './assets/investment-calculator-logo.png';

/*
  TUTOR'S GUIDANCE:
  Welcome back! Here are some extended hints to help you architect this React app intelligently.
  - Identify potentially reusable building blocks to split the app into custom components. 
    However, try not to be too granular (e.g., there's no need for every single DOM element 
    to be a separate component).
*/

function App() {

  /*
    TASK 3: State Management & Lifting State Up
    - Manage the user's input state. It's up to you to decide if you want to store it 
      as a single object or as multiple, individual state slices.
    - If your inputs are inside a separated 'UserInput' component, don't forget 
      to "lift state up" back to this 'App' component so the calculation logic can run.
    - Think carefully about whether you actually need to manage the calculated results 
      as entirely new state. You might be able to simply *derive* the calculation 
      results directly from the submitted user input state on every render!
  */

  const calculateHandler = (userInput) => {
    /*
      TASK 2: Event Handling
      There are three main events your app must listen and respond to:
      1. Form submission (handled here)
      2. Reset button being clicked
      3. User input changing (in the various <input /> fields) -> For these, consider 
         using a generic/shared change handler function to handle them all gracefully.
         
      Also, feel free to manipulate this `calculateHandler`. If it makes more sense, 
      you can execute the calculation logic right inside the component instead of 
      trapping it in this specific handler function.
    */

    const yearlyData = []; 

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

  };

  /*
    TASK 1: Component Splitting
    Separate this monolithic JSX out into logical components (e.g., Header, 
    UserInput, ResultsTable). 
  */

  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      <form className="form">
        <div className="input-group">
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input type="number" id="current-savings" />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input type="number" id="yearly-contribution" />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input type="number" id="expected-return" />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input type="number" id="duration" />
          </p>
        </div>
        <p className="actions">
          {/* Be sure to attach an event handler to respond to this reset click! */}
          <button type="reset" className="buttonAlt">
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>

      {/* 
        TASK 4: Conditional Output & Formatting
        - Output the table below conditionally (e.g., only if calculation data is present).
        - When mapping over the data to build out the rows, make sure to format the currency 
          values properly. 
          
          Here's a handy formatter snippet you can use:
          
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          ...
          formatter.format(yourValue);
      */}

      <table className="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>YEAR NUMBER</td>
            <td>TOTAL SAVINGS END OF YEAR</td>
            <td>INTEREST GAINED IN YEAR</td>
            <td>TOTAL INTEREST GAINED</td>
            <td>TOTAL INVESTED CAPITAL</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
