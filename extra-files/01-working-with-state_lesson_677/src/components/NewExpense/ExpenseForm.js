import React from 'react';

import './ExpenseForm.css';

const ExpenseForm = () => {
  // At this stage the form is only being structured.
  // Event handlers and state for reading the entered values will be added later.

  // The control wrapper groups related inputs so the layout CSS can arrange them
  // as one responsive block instead of styling each field in isolation.
  return (
    <form>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          {/* A plain text input is enough here because the title has no special
              browser-level formatting requirements. */}
          <input type='text' />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          {/* number, min, and step let the browser guide the user toward valid
              currency-like input before any custom validation exists. */}
          <input type='number' min='0.01' step='0.01' />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          {/* date gives us the native date picker, while min and max limit the
              allowed range to the years used elsewhere in this demo app. */}
          <input type='date' min='2019-01-01' max='2022-12-31' />
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
