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

// --- Lesson 698: Using Stateful Lists ---
//
// Why does this array need to be state at all? Simply pushing a
// new item onto a plain JavaScript array would NOT cause React to
// re-render the component. React only re-evaluates a component
// when its state (or its parent's state) changes. So to make the
// list update on screen when a user submits a new expense, we
// must manage the array with useState and update it through the
// setter function.
//
// The dummy data is extracted into a constant outside the
// component so it is only created once — not on every render.
// It is passed to useState as the initial value. After the first
// render, React ignores this argument; all subsequent changes
// come exclusively through setExpenses.
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
  // to the existing array.
  //
  // A naive approach would be:
  //   setExpenses([expense, ...expenses]);
  // This would work in many cases, but it references the
  // "expenses" variable captured in the closure, which may be
  // stale if React has batched multiple updates together.
  //
  // The correct pattern is the functional form: pass a function
  // to the setter, and React will call it with the guaranteed
  // latest snapshot (prevExpenses). This eliminates any risk of
  // working with an outdated array.
  //
  // Inside the callback we build a brand-new array using the
  // spread operator on prevExpenses. The spread operator works
  // on arrays the same way it works on objects — it pulls out
  // every existing element and places them after the new expense.
  // The new item goes first so it appears at the top of the list.
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
