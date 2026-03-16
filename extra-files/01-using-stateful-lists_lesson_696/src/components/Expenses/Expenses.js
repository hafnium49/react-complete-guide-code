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

import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
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

  // --- Lesson 700: Outputting Conditional Content ---
  //
  // When filteredExpenses is empty we want to show a fallback
  // message instead of rendering nothing. There are three common
  // approaches to conditional rendering in React:
  //
  //   Approach 1 — Ternary expression in JSX:
  //     {filteredExpenses.length === 0
  //       ? <p>No expenses found.</p>
  //       : filteredExpenses.map(...)}
  //     Works, but long ternaries become hard to read.
  //
  //   Approach 2 — Logical AND (&&) operator:
  //     {filteredExpenses.length === 0 && <p>No expenses found.</p>}
  //     {filteredExpenses.length > 0 && filteredExpenses.map(...)}
  //     Shorter, but splits the logic across two expressions.
  //     This works because JavaScript's && returns the right-hand
  //     operand when the left-hand side is truthy, and returns
  //     the left-hand side (a falsy value) when it is falsy —
  //     React ignores falsy values like false and 0 in JSX.
  //
  //   Approach 3 — Variable with an if-check (used here):
  //     Assign a default JSX value to a variable, then overwrite
  //     it with an if-check before the return statement. This
  //     keeps the returned JSX lean and moves the decision logic
  //     into plain JavaScript above the return.
  //
  // All three produce identical output. The variable approach
  // tends to be the cleanest when conditions are complex or when
  // there are more than two branches.
  //
  // A key insight: JSX can be stored in variables just like any
  // other value. It is not limited to the return statement. You
  // can assign it, pass it as an argument, or place it in an
  // array — React will render it wherever it ends up in the tree.
  let expensesContent = <p>No expenses found.</p>;

  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((expense) => (
      // --- Lesson 699 key and Lesson 697 .map() comments apply
      // --- here — see header comments above for full explanations.
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ));
  }

  // The returned JSX is now lean: {expensesContent} holds either
  // the fallback paragraph or the mapped list of ExpenseItems,
  // determined by the if-check above. No ternary or && clutter.
  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {/* --- Dynamic list rendering with .map() ---
          *
          * The curly braces open a JavaScript expression inside
          * JSX. .map() iterates over every expense object in the
          * filtered array and returns a new array of <ExpenseItem>
          * elements. React renders that array as sibling DOM nodes.
          *
          * The arrow function receives each expense object as
          * its parameter. We extract its properties into the
          * corresponding props that ExpenseItem expects.
          * Because the arrow uses parentheses (not braces),
          * the JSX element is implicitly returned — no explicit
          * "return" keyword is needed.
          *
          * Previously, four <ExpenseItem> elements were written
          * out by hand with hardcoded array indices like
          * props.items[0], props.items[1], etc. That approach
          * breaks as soon as the array length changes. Using
          * .map() makes the list self-adjusting: add an item
          * to the state array and a new row appears; remove one
          * and the corresponding row disappears.
          *
          * --- Lesson 699: Understanding "Keys" ---
          *
          * The key prop tells React which data item each DOM
          * element corresponds to. Without it, React only knows
          * the array grew or shrank by comparing lengths. When a
          * new item is prepended, React appends a NEW div at the
          * END of the DOM list and then walks through every
          * existing element, updating its content to match the
          * shifted array positions. This means:
          *
          *   - Every single list item gets re-written, even if
          *     its actual data has not changed (performance cost).
          *   - If any ExpenseItem held internal state (e.g. a
          *     toggled highlight), that state would be associated
          *     with a DOM position, not with the data. After the
          *     shift, state would "stick" to the wrong item (bug).
          *
          * Adding key={expense.id} solves both problems. React
          * can now match each element to its data by identity
          * rather than by position. When a new expense arrives,
          * React knows exactly where to insert the new DOM node
          * and leaves existing nodes untouched.
          *
          * Rules for choosing key values:
          *   - Use a value that is unique among siblings and
          *     permanently tied to the data (e.g. a database ID).
          *   - Do NOT use the array index as a key. The index is
          *     positional — it changes whenever items are added,
          *     removed, or reordered — so it provides no better
          *     identity signal than having no key at all.
          *   - In practice, most real-world data already has a
          *     unique identifier (from a database, an API, or a
          *     UUID generated at creation time).
          *   - The key can be any primitive (string or number).
          *
          * Note: key is a reserved prop — React consumes it
          * internally. It is NOT forwarded to the child component
          * via props. If ExpenseItem also needs the id for its
          * own logic, pass it as a separate prop (e.g. id=...).
          */}
        {expensesContent}
      </Card>
    </div>
  );
};

export default Expenses;
