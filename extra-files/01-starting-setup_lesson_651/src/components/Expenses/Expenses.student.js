import React from 'react';

// Assignment 1: Time to Practice — React & Component Basics
// Created a dedicated Expenses component to hold the expense list,
// keeping App.js focused on data and this component on layout.

import ExpenseItem from './ExpenseItem';
// Card lives in ../UI/ (sibling folder), so we go up one level
import Card from '../UI/Card';
import './Expenses.css';

// Receives the expenses array as props.items from App.js
const Expenses = (props) => {
  // Wrapping in Card for shared container styles (rounded corners, shadow).
  // "expenses" className adds the dark background from Expenses.css.
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
