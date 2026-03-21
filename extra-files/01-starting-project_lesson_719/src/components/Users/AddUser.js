import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  /*
    TUTOR'S GUIDANCE:
    "State Initialization & Array Destructuring"
    Here we hook directly into React's state configuration. A `useState` hook always inherently returns 
    an exact array comprised of two distinct elements! Utilizing javascript's array destructuring syntax `[]`, 
    we capture both properties physically:
    - Element index 0 (enteredUsername): holds the current latest rendered state snapshot value.
    - Element index 1 (setEnteredUsername): acts uniquely as a dispatching function forcing a complete 
      re-render cycle to natively overwrite our tracked component value!
  */
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  const addUserHandler = (event) => {
    // Prevent the default browser HTTP Request and page reload sequence!
    event.preventDefault();
    
    /*
      TUTOR'S GUIDANCE:
      "Capturing Output Data"
      Without doing any advanced verification metrics or wiping the original component yet (which is explicitly
      the homework required by the lesson prior to lecture 723), we simply pipe the two isolated user values 
      directly together successfully into our browser's Javascript Console!
    */
    console.log(enteredUsername, enteredAge);
  };

  const usernameChangeHandler = (event) => {
    // Dynamically captures keystroke data inherently dispatched out from the target `<input>` block.
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={usernameChangeHandler} />
        
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" onChange={ageChangeHandler} />
        
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
