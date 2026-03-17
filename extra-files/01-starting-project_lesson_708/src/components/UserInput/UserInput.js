/*
  TUTOR'S GUIDANCE:
  This UserInput component safely encapsulates the form.
  You will eventually configure local state here to track user input changes
  and lift the submitted values back up to the parent component.
*/
const UserInput = () => {
  /*
    TUTOR'S GUIDANCE: 
    Here is where we handle the form submission. The first step is blocking the browser's 
    built-in default page reload using `event.preventDefault()`. This allows our React code 
    to manage the application state without refreshing the entire browser window.
  */
  const submitHandler = (event) => {
    event.preventDefault();
    // Implementation to follow...
    console.log('SUBMIT');
  };

  /*
    TUTOR'S GUIDANCE: 
    When the user wants to clear the form, this separate function is triggered.
  */
  const resetHandler = () => {
    // Implementation to follow...
    console.log('RESET');
  };

  /*
    TUTOR'S GUIDANCE:
    Instead of writing four distinct functions to capture strokes in our four inputs, 
    we define a versatile, generic change handler function. We pass an identifier string 
    (so we know exactly which field triggered the event) along with the updated value string.
  */
  const inputChangeHandler = (input, value) => {
    console.log(input, value);
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler('current-savings', event.target.value)
            }
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
            type="number"
            id="duration"
          />
        </p>
      </div>
      <p className="actions">
        {/* We hook up our generic resetHandler strictly to the reset button's click event! */}
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
