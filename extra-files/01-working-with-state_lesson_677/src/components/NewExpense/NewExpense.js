import React from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = () => {
  // This wrapper component owns the visual container for the "add expense"
  // area, while the form markup itself lives in a more focused child component.
  // Splitting the UI like this keeps each file small and easier to evolve.
  return (
    <div className='new-expense'>
      <ExpenseForm />
    </div>
  );
};

export default NewExpense;
