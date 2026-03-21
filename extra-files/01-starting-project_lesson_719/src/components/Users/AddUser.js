import React from 'react';

import Card from '../UI/Card';
import classes from './AddUser.module.css';

/*
  TUTOR'S GUIDANCE:
  "JSX Accessibility & Functions"
  Notice how we use `htmlFor` instead of the native HTML `for` attribute inside JSX
  labels to avoid conflicting with the reserved Javascript `for` loop syntax!
  
  By wrapping our entire form loosely inside our custom `<Card>` wrapper, we visually isolate 
  the inputs beautifully against the dark app background! Remember to dynamically pass 
  our encapsulated `{classes.input}` downwards to customize the card's local width strictly.
*/
const AddUser = (props) => {
  const addUserHandler = (event) => {
    // Prevent the default browser HTTP Request and page reload sequence!
    event.preventDefault();
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" />
        <button type="submit">Add User</button>
      </form>
    </Card>
  );
};

export default AddUser;
