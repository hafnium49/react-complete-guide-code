import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

/*
  TUTOR'S GUIDANCE:
  "State Management & Component Architecture"
  Here we build the operational core of our form exactly as requested by the Lesson hints.
  We leverage two different state slices (`enteredUsername` and `enteredAge`) tracking our 
  native DOM values similarly to the previous calculator application.
*/
const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  const addUserHandler = (event) => {
    event.preventDefault();

    /*
      TUTOR'S GUIDANCE:
      "Safe Validation"
      Before doing ANY data-lifting, verify the payload! 
      We immediately `return` (killing the function sequence) to bounce bad inputs, 
      verifying the input has real length strings and an age over 0.
    */
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }
    if (+enteredAge < 1) {
      return;
    }
    
    /*
      TUTOR'S GUIDANCE:
      "Lifting State Up"
      This custom prop is established in App.js as a listener. When the Submit constraints are met, 
      we fire it, firing the username and exact age back to the parent module sequence!
    */
    props.onAddUser(enteredUsername, enteredAge);
    
    // Controlled Components: Once hoisted, wipe the UI slate back to blank strings.
    setEnteredUsername('');
    setEnteredAge('');
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
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
