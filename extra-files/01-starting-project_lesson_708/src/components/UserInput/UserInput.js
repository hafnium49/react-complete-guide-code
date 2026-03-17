import { useState } from 'react';

/*
  TUTOR'S GUIDANCE:
  By defining our 'initial state' object outside of the component function, 
  we ensure React doesn't recreate this identical object unnecessarily 
  every single time the component re-renders. 
  
  The keys we chose below correspond directly to the input fields we are rendering. 
  Notice how we wrap property names containing a dash (e.g. 'current-savings') 
  in quotation marks so they remain valid JavaScript keys!
*/
const initialUserInput = {
  'current-savings': 10000,
  'yearly-contribution': 1200,
  'expected-return': 7,
  duration: 10,
};

const UserInput = () => {
  /*
    TUTOR'S GUIDANCE:
    Here we hook into React's state system! We pass our initial object and destructure 
    the returned array into our state variable ('userInput') and our updater function ('setUserInput').
    Whether you write one big state object like this or utilize four separate `useState` 
    calls (one for each input) is completely up to your architectural preference!
  */
  const [userInput, setUserInput] = useState(initialUserInput);

  const submitHandler = (event) => {
    event.preventDefault();
    // Implementation to follow...
    console.log('SUBMIT');
  };

  const resetHandler = () => {
    /*
      TUTOR'S GUIDANCE:
      When the user resets the form, we can simply pass our cached `initialUserInput` 
      directly back into the state updater, reverting everything cleanly!
    */
    setUserInput(initialUserInput);
  };

  const inputChangeHandler = (input, value) => {
    /*
      TUTOR'S GUIDANCE:
      To prevent erasing unmodified values when updating an object state, we must pass 
      an anonymous function into our state updater. React will inject the 'previous state' 
      safely into this function.
      
      Inside, we spread ('...') the old state, and then use dynamic object key assignment 
      (`[input]: value`) to overwrite only the specific input that triggered this change event.
    */
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value,
      };
    });
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          {/*
            TUTOR'S GUIDANCE:
            By assigning the `value` property explicitly to our React state, we 
            achieve "Two-Way Binding." We don't just extract data from the input, 
            we forcefully feed React's controlled data back into the DOM element!
          */}
          <input
            onChange={(event) =>
              inputChangeHandler('current-savings', event.target.value)
            }
            value={userInput['current-savings']}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler('yearly-contribution', event.target.value)
            }
            value={userInput['yearly-contribution']}
            type="number"
            id="yearly-contribution"
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(event) =>
              inputChangeHandler('expected-return', event.target.value)
            }
            value={userInput['expected-return']}
            type="number"
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(event) =>
              inputChangeHandler('duration', event.target.value)
            }
            value={userInput['duration']}
            type="number"
            id="duration"
          />
        </p>
      </div>
      <p className="actions">
        <button onClick={resetHandler} type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};

export default UserInput;
