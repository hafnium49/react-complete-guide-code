// React is the default export here. useState is a named export that gives this
// component a React-managed value which can participate in rerendering.
import React, { useState } from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  // Hooks are called directly inside the component body so React can connect
  // this call to the correct component instance on every render.
  //
  // A normal local variable could hold a different title for a moment, but that
  // alone would not tell React to render this component again.
  // useState stores a value that React tracks across renders and gives us an
  // updater function that can request a fresh render with new data.
  // The argument is the starting value for this state on the first render.
  // The array destructuring syntax pulls out the current value first and the
  // updater function second.
  const [title, setTitle] = useState(props.title);

  // ExpenseItem is just a function. React runs it during rendering and uses the
  // returned JSX to decide what should appear on the screen.
  // Leaving this log in place helps show that a state update causes React to
  // run the component function again to produce the next UI snapshot.
  console.log('ExpenseItem evaluated by React');

  const clickHandler = () => {
    // Calling the state updater does more than change a value in memory.
    // It tells React to store the next state value and schedule another render
    // for this component so the JSX can be evaluated again with fresh data.
    setTitle('Updated!');

    // Reading title immediately after setTitle still shows the value from the
    // current render because the next render has not happened yet.
    // State updates are scheduled, so the new value becomes visible in the
    // following render rather than in the rest of this function body.
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
