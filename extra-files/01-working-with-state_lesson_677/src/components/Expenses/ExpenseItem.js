import React, { useState } from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  // This local state starts with the incoming title, but after that it belongs
  // to this specific ExpenseItem instance and can change independently.
  const [title, setTitle] = useState(props.title);

  // Leaving this log in place helps show that a state update causes React to
  // run the component function again to produce the next UI snapshot.
  console.log('ExpenseItem evaluated by React');

  const clickHandler = () => {
    // Calling the state updater tells React that this component should be
    // rendered again with a new title value.
    setTitle('Updated!');

    // Reading title immediately after setTitle still shows the value from the
    // current render because the next render has not happened yet.
    console.log(title);
  };

  // JSX stays easier to read when event-handling logic is declared above the
  // returned markup instead of being written inline on the element.

  // The visible heading reads from state, so the text can change after a click
  // without any manual DOM manipulation.
  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
      {/* React exposes DOM events through props that start with "on". The value
          is a function reference, so the handler runs later in response to the
          click instead of during rendering. */}
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}

export default ExpenseItem;
