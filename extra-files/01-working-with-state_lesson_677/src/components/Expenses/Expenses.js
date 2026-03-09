import React from 'react';

import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import './Expenses.css';

const Expenses = (props) => {
  // Card provides a shared visual wrapper so this component can focus on
  // describing which ExpenseItem components should appear inside it.

  // The expenses are written out one by one here on purpose so the lesson can
  // stay centered on props and composition before list rendering is introduced.
  // Each <ExpenseItem /> in this JSX tells React to evaluate another component
  // function while it walks down the tree.
  // Because each rendered ExpenseItem is its own component instance, each one
  // can react to its own button clicks without affecting the others directly.
  return (
    <Card className="expenses">
      <ExpenseItem
        title={props.items[0].title}
        amount={props.items[0].amount}
        date={props.items[0].date}
      />
      <ExpenseItem
        title={props.items[1].title}
        amount={props.items[1].amount}
        date={props.items[1].date}
      />
      <ExpenseItem
        title={props.items[2].title}
        amount={props.items[2].amount}
        date={props.items[2].date}
      />
      <ExpenseItem
        title={props.items[3].title}
        amount={props.items[3].amount}
        date={props.items[3].date}
      />
    </Card>
  );
}

export default Expenses;
