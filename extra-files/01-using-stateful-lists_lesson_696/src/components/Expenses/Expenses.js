// --- Expenses.js: The Central Component for This Section ---
//
// This is the component that will change the most throughout
// Section 05. At this starting point it has two gaps that the
// upcoming lessons will fill:
//
//   Gap 1 — No actual filtering: RESOLVED in Lesson 700.
//   A .filter() call now narrows the array to the selected
//   year before mapping it to JSX elements.
//
//   Gap 2 — No key prop on ExpenseItem: RESOLVED in Lesson 699.
//   key={expense.id} is now passed, allowing React to track
//   each item by identity rather than by position.
//
// Both gaps are now closed.
//
// --- Lesson 697: Rendering Lists of Data ---
//
// In most real applications, the number of items to display is
// not known at build time — users add and remove data at runtime.
// Hard-coding a fixed number of <ExpenseItem> elements (as we
// did in earlier sections) does not scale. Instead, we render
// lists dynamically using JavaScript's built-in Array.map().
//
// How .map() works in this context:
//
//   1. props.items is an array of expense objects, each with
//      fields like title, amount, and date.
//
//   2. Calling props.items.map(fn) creates a NEW array whose
//      elements are whatever fn returns for each input element.
//      The original array is not mutated.
//
//   3. Inside the callback we return a JSX element (<ExpenseItem>)
//      for each expense object. This transforms the plain data
//      array into an array of React elements.
//
//   4. When React encounters an array of JSX elements inside
//      curly braces in the return statement, it renders each
//      element in order — just as if they had been written out
//      one by one in the markup.
//
// The key advantage is that the rendered output automatically
// reflects whatever is in the array at the time of rendering.
// If a new expense is added to state (via setExpenses in App.js),
// React re-executes this component, .map() runs again over the
// updated array, and the new item appears in the UI without any
// manual DOM manipulation.
import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
// --- Lesson 701: ExpensesList now owns the list rendering ---
//
// The .map() call, the key logic (Lesson 699), and the conditional
// fallback (Lesson 700) have all moved into ExpensesList.js.
// Expenses.js is now responsible only for managing the filter
// state and passing the filtered array down. This separation
// keeps each component focused on a single concern.
import ExpensesList from './ExpensesList';
import './Expenses.css';

const Expenses = (props) => {
  // The selected year is stored here (not in ExpensesFilter)
  // because this parent component needs the value to decide
  // which items to display — a classic "lifting state up" case.
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // --- Lesson 700: Filtering the list ---
  //
  // Array.filter() works like .map() — it takes a callback that
  // runs for every element — but instead of transforming each
  // element, it keeps only those for which the callback returns
  // true. The result is a new array (the original is untouched).
  //
  // Here we compare each expense's year (extracted with
  // getFullYear() and converted to a string) against the
  // filteredYear state. Only matching expenses survive into
  // filteredExpenses. Because this runs inside the component
  // function, it re-executes every time filteredYear changes
  // via a state update — the list on screen updates automatically.
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  // --- Lesson 701: Lean returned JSX ---
  //
  // Previously, the conditional content logic (variable +
  // if-check from Lesson 700) lived here. Now ExpensesList
  // handles that internally — it decides whether to render
  // the list or a fallback. This component simply passes
  // the filtered data and lets the child take care of the rest.
  //
  // Lesson 700 taught three approaches to conditional rendering
  // (ternary, &&, variable). ExpensesList introduces a fourth:
  // the early return — see ExpensesList.js for details.
  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
