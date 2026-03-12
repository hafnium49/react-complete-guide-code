import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  // ExpenseItem is now back to being a presentational component.
  // It receives ready-to-display data through props and focuses on rendering,
  // not on owning or changing any local state.
  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        {/* With the temporary demo state removed, the title can come straight
            from props again. */}
        <h2>{props.title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
