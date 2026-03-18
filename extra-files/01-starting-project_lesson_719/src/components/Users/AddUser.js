import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

/*
  TUTOR'S GUIDANCE:
  "State Management & Component Architecture"
  Here we build the logic hub of our User form per the architectural hints.
  We maintain separate states for the literal strings registered in the `<input>` DOM fields,
  and validate them on submission before communicating back outwards.
*/
const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  const addUserHandler = (event) => {
    event.preventDefault();

    /*
      TUTOR'S GUIDANCE:
      "Safe Validation"
      To fulfill the constraints set forth in Lesson 718 for the error overlays, 
      we must first check whether our form payload is inherently malformed before sending it. 
      Right now we just return implicitly (killing the handler), but soon we'll trigger the Error popup here!
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
      By hooking into this prop established loosely from the parent App.js rendering context, 
      we pass our locally-validated payload sequence strictly upwards so that App.js can 
      track the global `userList` object natively.
    */
    props.onAddUser(enteredUsername, enteredAge);
    
    // Wipe our UI tracker slates
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
