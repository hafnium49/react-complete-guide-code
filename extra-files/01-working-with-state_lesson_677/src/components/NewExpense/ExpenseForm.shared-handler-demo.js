import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseFormLesson688SharedHandler = () => {
  // This file is an educational alternative to ExpenseForm.js.
  // It demonstrates the "one shared change handler" approach without replacing
  // the component that the app currently imports.

  // The component still keeps one state slice per field.
  // The lesson's experiment is not about changing the state shape, but about
  // changing how input events are routed to those state setters.
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // The shared handler receives two custom arguments:
  // 1. an identifier that tells us which field triggered the update
  // 2. the current value that should be stored for that field
  //
  // This is different from the specialized-handler approach, where each field
  // has its own dedicated function. Both approaches are valid. This one trades
  // a bit of branching logic for less repeated handler code.
  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    if (inputIdentifier === 'title') {
      // The identifier tells us to route this value into the title state.
      setEnteredTitle(enteredValue);
    } else if (inputIdentifier === 'date') {
      // The date field is handled in the same function, but still updates its
      // own independent state slice.
      setEnteredDate(enteredValue);
    } else {
      // The remaining supported field in this small form is the amount input.
      setEnteredAmount(enteredValue);
    }
  };

  return (
    <form>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          {/* React will call the function given to onChange with the event object.
              If we passed inputChangeHandler directly, it would only receive that
              event and not our custom identifier.

              The small wrapper arrow function solves that problem:
              it receives the event from React,
              extracts event.target.value,
              and then manually calls inputChangeHandler with both pieces of data
              that the shared handler expects. */}
          <input
            type='text'
            onChange={(event) => inputChangeHandler('title', event.target.value)}
          />
        </div>

        <div className='new-expense__control'>
          <label>Amount</label>
          {/* The wrapper function pattern is the same here.
              Only the identifier changes, which is exactly why this technique can
              feel attractive when several inputs share near-identical behavior. */}
          <input
            type='number'
            min='0.01'
            step='0.01'
            onChange={(event) => inputChangeHandler('amount', event.target.value)}
          />
        </div>

        <div className='new-expense__control'>
          <label>Date</label>
          {/* The browser still provides a string value here, even though the UI
              uses a date picker. The shared handler does not care where the value
              came from; it only needs the field identifier and the next value. */}
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            onChange={(event) => inputChangeHandler('date', event.target.value)}
          />
        </div>
      </div>

      <div className='new-expense__actions'>
        {/* This button is only a visual placeholder in the teaching variant.
            Later lesson steps attach real submit behavior to the form instead. */}
        <button type='button'>Add Expense</button>
      </div>

      {/* This debug block is included only in the educational variant.
          It gives visible feedback that the shared handler is updating separate
          state slices correctly, even though the inputs themselves are left
          uncontrolled in this snapshot. */}
      <p>
        Debug values: {enteredTitle || '(no title)'} / {enteredAmount || '(no amount)'} /{' '}
        {enteredDate || '(no date)'}
      </p>
    </form>
  );
};

export default ExpenseFormLesson688SharedHandler;
