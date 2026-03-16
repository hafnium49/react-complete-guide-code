import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

// --- Lesson 701: Semantic list item wrapper ---
//
// Since ExpensesList now renders a <ul>, each item it contains
// should be a <li> for valid HTML semantics. We wrap the entire
// Card in a <li> element here rather than inside ExpensesList
// because ExpenseItem is the component that represents a single
// list entry — it makes sense for it to declare its own role in
// the document structure. Visually nothing changes; the CSS
// already handles all styling via class names.
const ExpenseItem = (props) => {
  return (
    <li>
      <Card className='expense-item'>
        <ExpenseDate date={props.date} />
        <div className='expense-item__description'>
          <h2>{props.title}</h2>
          <div className='expense-item__price'>${props.amount}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
