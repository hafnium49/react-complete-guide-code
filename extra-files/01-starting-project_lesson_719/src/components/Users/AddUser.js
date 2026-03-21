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
      "Form Validations"
      Before executing ANY real logic (or clearing fields), we apply basic guard clauses.
      `.trim()` natively removes any accidental trailing/leading whitespace. If the lengths 
      equate to `0` (meaning empty fields), we intentionally call `return;` which completely 
      halts the function and throws away the submission gracefully!
    */
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }

    /*
      TUTOR'S GUIDANCE:
      "Type Conversions"
      Since `enteredAge` natively tracks data flowing out of an HTML element, it evaluates inherently 
      as a literal Javascript String primitive. By writing `+enteredAge`, the unary prefix forces 
      Javascript to mathematically cast the string as an undeniable integer before running the condition!
    */
    if (+enteredAge < 1) {
      return;
    }
    
    /*
      TUTOR'S GUIDANCE:
      "Lifting State Upwards"
      Instead of console logging the isolated strings, we intercept them and execute our
      `onAddUser` prop! This effectively fires the internal parameters backwards, upwards through 
      our component pipeline directly into `App.js` where the orchestrator component tracks everything globally.
    */
    props.onAddUser(enteredUsername, enteredAge);

    // Overwrite tracker states explicitly
    setEnteredUsername('');
    setEnteredAge('');
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
        {/*
          TUTOR'S GUIDANCE:
          "Two-Way Binding"
          By physically defining `value={enteredUsername}`, we wire a pipeline pointing backwards.
          Now your state doesn't just listen to the DOM, your DOM inherently listens to your State! 
          When `addUserHandler` overrides the states to `''` blank layouts on success, the DOM clears natively!
        */}
        <input 
          id="username" 
          type="text" 
          value={enteredUsername}
          onChange={usernameChangeHandler} 
        />
        
        <label htmlFor="age">Age (Years)</label>
        <input 
          id="age" 
          type="number" 
          value={enteredAge}
          onChange={ageChangeHandler} 
        />
        
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
