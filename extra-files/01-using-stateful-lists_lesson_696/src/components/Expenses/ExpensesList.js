// --- Lesson 701: Adding a Filter ---
// --- (More precisely: Extracting the List into Its Own Component) ---
//
// The Expenses component was accumulating too many responsibilities:
// managing the filter state, filtering the data, deciding what to
// render when the list is empty, AND mapping items to JSX. Extracting
// the list-rendering logic into ExpensesList keeps each component
// focused on a single job:
//
//   - Expenses: owns the filter state, applies .filter(), and passes
//     the filtered array down.
//   - ExpensesList (this file): receives the already-filtered array
//     and decides HOW to render it — either as a list of ExpenseItem
//     elements or as a fallback message.
//
// --- Early Return for Conditional Rendering ---
//
// This component introduces a fourth way to handle conditional
// content (in addition to the ternary, &&, and variable approaches
// shown in Lesson 700): the early return.
//
// When the ENTIRE output of a component changes based on a condition
// — not just a small section of the JSX — you can place an if-check
// at the top of the function and return a completely different JSX
// block. The component exits early, so the remaining code (the
// normal-case JSX) never runs.
//
// This pattern is cleaner than the variable approach when there is
// no shared wrapper JSX between the two branches. It would NOT have
// been appropriate inside Expenses.js, where only the list portion
// changed while the surrounding Card and ExpensesFilter stayed the
// same regardless of the condition.
//
// --- Semantic HTML: <ul> and <li> ---
//
// Because we are rendering a list of items, the semantically correct
// HTML element is an unordered list (<ul>). Each ExpenseItem now
// wraps itself in a <li> (see ExpenseItem.js). This does not change
// the visual appearance — the CSS removes default list styling — but
// it communicates the document structure to screen readers and search
// engines.
import React from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
  // Early return: if there are no items to display, render a
  // styled fallback heading and exit. The rest of the function
  // body is skipped entirely — no .map() call, no <ul>.
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
  }

  // Normal case: render the filtered expenses inside a <ul>.
  // The 'expenses-list' class removes default bullet points and
  // padding so that the list looks like a stack of cards.
  return (
    <ul className='expenses-list'>
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
