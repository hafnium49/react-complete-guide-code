import React from 'react';

import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

const App = () => {
  // Keeping the data in the top-level component makes it easy to pass the same
  // source of truth down into child components through props.
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  // The new expense data ultimately matters here because App is the first
  // component in this tree that also knows about the existing expenses list.
  // The actual list update will come in a later section, so logging the received
  // expense is enough for this lesson's checkpoint.
  const addExpenseHandler = (expense) => {
    console.log(expense);
  };

  // App now combines two different concerns:
  // one branch gathers new expense data and the other branch shows existing
  // expenses. Keeping both here makes App the composition root for the page.
  return (
    <div>
      {/* Passing a function down like a prop lets child components call back into
          App later with newly created data. */}
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
