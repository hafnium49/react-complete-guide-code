import React from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  // ExpenseForm creates the raw form data. NewExpense enriches it with an id
  // before forwarding it to the next parent component.
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      // A random string is enough for this demo so each newly created item can
      // later be distinguished from the existing expenses.
      id: Math.random().toString(),
    };

    // Child-to-parent communication in React usually works through callback
    // props like this one.
    props.onAddExpense(expenseData);
  };

  // This wrapper component owns the visual container for the "add expense"
  // area, while the form markup itself lives in a more focused child component.
  // Splitting the UI like this keeps each file small and easier to evolve.
  return (
    <div className='new-expense'>
      {/* This is a custom prop, not a built-in React event prop. The naming
          simply follows the same "onSomething" convention to signal that the
          child component is expected to call it later. */}
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
