import logo from './assets/investment-calculator-logo.png';

/*
  TUTOR NOTE:
  Welcome to your first practice project! 
  Currently, this file contains the entire application in a single component.
  Your overarching goal is to refactor this code to follow React best practices:
  - Component Splitting
  - State Management
  - Conditional Rendering
  - List Outputting
  
  Please follow the steps outlined in the comments below to progressively build
  and refine this application.
*/

function App() {
  /*
    TASK 1: State Management
    To keep track of the submitted data and recalculate our table, we need state.
    Use the 'useState' hook here to manage the user's input data or the calculated results.
    We will use this state to determine what to render on the screen.
  */

  const calculateHandler = (userInput) => {
    /*
      TASK 2: Event Handling
      This function should be executed upon form submission. However, rather than 
      binding it directly to the native submit event, you should trigger it from 
      within your dedicated form component (once extracted), passing the gathered 
      user inputs up to this parent component (Lifting State Up).
    */

    const yearlyData = []; // This array will hold the calculated per-year results

    let currentSavings = +userInput['current-savings']; // The starting balance
    const yearlyContribution = +userInput['yearly-contribution']; // Amount added annually
    const expectedReturn = +userInput['expected-return'] / 100; // Annual interest rate percentage
    const duration = +userInput['duration']; // Overall timeframe in years

    // The loop iterates over each year to calculate compound interest and total savings
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

    /*
      TASK 3: Update State
      Now that we have the derived calculations stored in the 'yearlyData' array (or the raw 
      userInput data), update the component state you created in TASK 1. 
      Updating the state will cause React to re-evaluate and re-render the UI based on 
      the fresh information.
    */
  };

  /*
    TUTOR NOTE on Component Extraction:
    The JSX returned below is monolithic. It is considered good practice to break down 
    large interfaces into smaller, reusable building blocks.
  */
  return (
    <div>
      {/* 
        TASK 4: Header Component Extraction
        Extract the <header> element along with its logo image and title into its own 
        functional component (e.g., 'Header'). Don't forget to move the logo import as well!
      */}
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      {/* 
        TASK 5: User Input Component Extraction
        Extract this entire <form> structure into a separate component (e.g., 'UserInput').
        Inside that new component, you will need to handle changes to the input fields,
        manage local state for the form values, and safely call the 'calculateHandler' 
        passed down via props when the form is submitted.
      */}
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
          <button type="reset" className="buttonAlt">
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>

      {/* 
        TASK 6: Conditional Content
        The financial data table should only appear if the user has successfully 
        submitted the form and the data has been computed. If no state data exists, 
        render a simple fallback paragraph indicating that nothing has been calculated yet.
      */}

      {/* 
        TASK 7: Results Table Component Extraction
        Move this <table> markup into a new component (e.g., 'ResultsTable').
        Pass the calculated yearly data down to it via props.
        
        TASK 8: Outputting Lists
        Within the new ResultsTable component, map over the received data array.
        For each year's data item, yield a corresponding <tr> element containing 
        the correctly formatted values. Ensure each rendered row provides a unique 'key' prop.
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
