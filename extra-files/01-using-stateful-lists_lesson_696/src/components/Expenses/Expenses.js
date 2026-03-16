// --- Expenses.js: The Central Component for This Section ---
//
// This is the component that will change the most throughout
// Section 05. At this starting point it has two gaps that the
// upcoming lessons will fill:
//
//   Gap 1 — No actual filtering: the dropdown updates
//   filteredYear in state, but the .map() call still iterates
//   over ALL items in props.items. A .filter() step that
//   narrows the array to the selected year is missing.
//
//   Gap 2 — No key prop on ExpenseItem: React needs a stable,
//   unique identifier on each element in a dynamically rendered
//   list so it can efficiently track additions, removals, and
//   reordering. Without it, React falls back to using array
//   indices, which leads to subtle bugs when the list changes.
//
// Both gaps are addressed in the next few lessons.
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

  // NOTE: props.items is rendered without filtering — every
  // expense appears regardless of the selected year. This is
  // the starting state; filtering will be added in a later lesson.
  //
  // Also notice that .map() produces an ExpenseItem for each
  // element but does NOT pass a "key" prop. React will log a
  // warning about this. Adding key={expense.id} is one of the
  // first things this section will address.
  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {props.items.map((expense) => (
          <ExpenseItem
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))}
      </Card>
    </div>
  );
};

export default Expenses;
