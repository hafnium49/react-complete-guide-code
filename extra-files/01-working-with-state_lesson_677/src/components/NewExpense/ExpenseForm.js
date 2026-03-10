import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = () => {
  // This version groups the related form fields into one state object instead
  // of keeping three independent state slices.
  // Empty strings are a sensible starting point because all three inputs begin
  // without any user-provided value.
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  // With object state, React replaces the old object with the new one.
  // That means every update must preserve the fields that should survive.

  const titleChangeHandler = (event) => {
    // Spreading userInput copies the existing fields into the next object
    // before we override just the title entry.
    setUserInput({
      ...userInput,
      enteredTitle: event.target.value,
    });
  };

  const amountChangeHandler = (event) => {
    // Input values arrive as strings, even for <input type="number">.
    setUserInput({
      ...userInput,
      enteredAmount: event.target.value,
    });
  };

  const dateChangeHandler = (event) => {
    // The browser also gives back the selected date as a string here.
    setUserInput({
      ...userInput,
      enteredDate: event.target.value,
    });
  };

  // The control wrapper groups related inputs so the layout CSS can arrange them
  // as one responsive block instead of styling each field in isolation.
  return (
    <form>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          {/* onChange is a convenient default for form fields because the same
              prop can be used across different input types in later steps. */}
          <input type='text' onChange={titleChangeHandler} />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          {/* number, min, and step let the browser guide the user toward valid
              currency-like input before any custom validation exists. */}
          <input
            type='number'
            min='0.01'
            step='0.01'
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          {/* date gives us the native date picker, while min and max limit the
              allowed range to the years used elsewhere in this demo app. */}
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        {/* submit makes the button participate in the form lifecycle, which will
            matter once form submission handling is added. */}
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
