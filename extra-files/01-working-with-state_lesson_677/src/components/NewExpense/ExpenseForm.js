import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  // This version returns to one state slice per field.
  // That keeps each update small and direct because changing the title does not
  // require rebuilding an object that also holds amount and date.
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // A single object state is still a valid alternative for related fields.
  // If that object-style update ever depends on the previous snapshot, the safer
  // pattern is the functional updater form: setState((prevState) => ...).
  //
  // Another valid alternative is one shared change handler that receives an
  // identifier plus the changed value. This lesson stays with dedicated handler
  // functions because they are straightforward to read while the form is small.

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

  const submitHandler = (event) => {
    // Forms try to submit a request by default. Preventing that keeps the page
    // in place so React code can decide what should happen with the collected data.
    event.preventDefault();

    // The form state is combined into one object right before submission.
    // Converting the date string into a Date object matches the data shape used
    // by the existing expenses in this demo.
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    // Instead of keeping the finished data inside this component, we hand it to
    // the parent through the callback prop. The parent can then decide what
    // "save" means for the rest of the app.
    props.onSaveExpenseData(expenseData);

    // Because the inputs read their displayed value from state, resetting the
    // state back to empty strings also clears the visible form fields.
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  // The control wrapper groups related inputs so the layout CSS can arrange them
  // as one responsive block instead of styling each field in isolation.
  return (
    // Listening on the form itself lets one submit event cover the whole form
    // instead of wiring click behavior to a specific button.
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          {/* onChange is a convenient default for form fields because the same
              prop can be used across different input types in later steps.
              Passing titleChangeHandler directly lets React provide the event
              object automatically. A wrapper arrow function would only be needed
              if we wanted to pass extra custom arguments as well.
              value={enteredTitle} closes the loop by feeding the current state
              back into the input, which makes this a controlled field. */}
          <input type='text' value={enteredTitle} onChange={titleChangeHandler} />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          {/* number, min, and step let the browser guide the user toward valid
              currency-like input before any custom validation exists.
              The value prop lets React overwrite the displayed content later,
              for example right after a successful submit. */}
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          {/* date gives us the native date picker, while min and max limit the
              allowed range to the years used elsewhere in this demo app.
              Binding enteredDate here means the chosen date is controlled by
              component state instead of only living inside the DOM element. */}
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        {/* submit lets the button trigger the form's submit event so the handler
            above can gather all field values in one place. */}
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
