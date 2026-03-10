import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = () => {
  // This version returns to one state slice per field.
  // That keeps each update small and direct because changing the title does not
  // require rebuilding an object that also holds amount and date.
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // A single object state is still a valid alternative for related fields.
  // If that object-style update ever depends on the previous snapshot, the safer
  // pattern is the functional updater form: setState((prevState) => ...).

  const titleChangeHandler = (event) => {
    // The title input produces a string value, so we can store it directly.
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    // Input values arrive as strings, even for <input type="number">.
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    // The browser also gives back the selected date as a string here.
    setEnteredDate(event.target.value);
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
