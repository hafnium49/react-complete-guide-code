// --- Section 05: Rendering Lists & Conditional Content ---
// --- Lesson 696: Module Introduction ---
//
// This section builds on everything covered so far — components,
// props, state, and event handling — and adds two remaining
// pieces needed to finish the application:
//
//   1. Rendering lists — outputting arrays of data as repeated
//      UI elements. The expenses array already exists, but in
//      upcoming lessons we will learn how to render it dynamically
//      with .map(), add proper keys for efficient reconciliation,
//      and update the list when new items are added via state.
//
//   2. Conditional content — showing or hiding parts of the UI
//      based on runtime conditions. For example, displaying a
//      fallback message when no expenses match the selected year,
//      or toggling the visibility of the expense form.
//
// At this starting point the application can already:
//   - Display expense items from a stateful array
//   - Add new expenses through the NewExpense form
//   - Filter by year using the ExpensesFilter dropdown
//
// What is NOT yet working:
//   - The year filter dropdown does not actually filter the list
//     (the .filter() call is missing — items render regardless
//     of which year is selected)
//   - There is no key prop on the mapped ExpenseItem elements,
//     which will cause a React console warning
//   - There is no feedback when the filtered list is empty
//
// These gaps are exactly what this section will address.
import React, { useState } from 'react';

import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

// Initial seed data defined outside the component so it is created
// only once. In a real app this would come from a database or API;
// here it serves as the starting contents of the expenses state.
const DUMMY_EXPENSES = [
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

const App = () => {
  // The expenses array is managed as state so React re-renders
  // whenever an item is added. DUMMY_EXPENSES provides the
  // initial snapshot; after that, only the setter drives changes.
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  // When NewExpense submits a new entry, this handler prepends it
  // to the existing array. The functional form of the setter
  // (receiving prevExpenses) guarantees we always work with the
  // most recent snapshot, which matters when multiple state
  // updates could be batched by React.
  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  // --- Lesson 697: How dynamic rendering connects to state ---
  //
  // The entire expenses array is passed to Expenses as items.
  // Inside Expenses, .map() transforms that array into JSX.
  // When addExpenseHandler prepends a new expense via the setter
  // above, React re-renders this component with the updated
  // array, which flows into Expenses, which re-runs .map(),
  // and the new item appears automatically. This is the payoff
  // of combining stateful arrays with dynamic list rendering:
  // the UI stays in sync with the data without any imperative
  // DOM manipulation.
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
