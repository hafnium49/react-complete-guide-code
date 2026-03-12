import React, { useState } from 'react';

import ExpenseItem from './ExpenseItem';
import ExpensesFilter from './ExpensesFilter';
import Card from '../UI/Card';
import './Expenses.css';

const Expenses = (props) => {
  // This state remembers which year is currently selected in the filter.
  // Keeping it here allows this component to both render the dropdown and
  // later decide which expense items should stay visible.
  const [filteredYear, setFilteredYear] = useState('2020');

  // The filter component reports the selected year upward through a callback
  // prop. Updating state here causes Expenses to render again with the new
  // value, which also feeds the chosen year back into the dropdown.
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // This is a derived value: we do not store the filtered list as its own
  // state because it can always be recomputed from the original items and the
  // selected year.
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  // Card provides a shared visual wrapper so this component can focus on
  // describing which ExpenseItem components should appear inside it.
  // ExpensesFilter is controlled by this component: the selected value lives in
  // Expenses, and the child only displays that value and forwards changes.
  // This component is also the destination branch for expense data coming from
  // elsewhere in the tree, which is why that data must be lifted to a parent
  // component first and then passed down here as props.
  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {filteredExpenses.map((expense) => (
        // Each rendered ExpenseItem still becomes its own component instance.
        // React uses the key to keep those instances aligned with the correct
        // expense data between renders.
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </Card>
  );
}

export default Expenses;
