import logo from './assets/investment-calculator-logo.png';

/*
  TUTOR'S GUIDANCE:
  Welcome to your first demo project!
  You have this one monolithic file right now. You shouldn't try to leave it like this.
  Instead, your goal is to practice React's essential concepts. I've broken these down
  into specific tasks below.
  
  Note: Some calculation logic has already been provided to save you time! 
*/

function App() {

  /*
    TASK 3: State Management
    You need to manage state somehow. It's your choice whether you prefer keeping
    several independent state slices or combining them into larger state objects.
    - First, capture and maintain the user's form inputs.
    - Second, you must eventually store the resulting investment data here 
      so that it can be passed along to your output component.
  */

  const calculateHandler = (userInput) => {
    /*
      TASK 2: Event Handling
      You should make sure functions respond when your forms are being submitted 
      and when the 'reset' button is clicked. They don't have to do anything 
      fancy right away, but you definitely need handlers firing for both events!
      
      For the submit event, this `calculateHandler` will take user input and
      compute the yearly results.
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
      After computation, be sure to update your component's state with the derived 
      investment data. This triggers React to output your results!
    */
  };

  /*
    TASK 1: Component Splitting
    The JSX code below represents the entire application interface. 
    Review it and identify logical visual parts. You should separate this into 
    at least a few distinct, smaller components (for instance: a Header, 
    a UserInput form, and a ResultsTable).
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
        TASK 4: Conditional Output & Dynamic Content
        You shouldn't always show the table. 
        - If no calculations have been triggered yet, display a simple fallback paragraph.
        - If data *is* available, output this table conditionally.
        - Inside the table, map your state data dynamically into rows (one <tr> per individual year).
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
