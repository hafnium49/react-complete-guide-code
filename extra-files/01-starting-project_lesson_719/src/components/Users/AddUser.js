import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  /*
    TUTOR'S GUIDANCE:
    "Dynamic Component Rendering"
    Because our initial state mapping is fundamentally completely empty (undefined), the `error` 
    tracking object natively returns exactly as a 'Falsy' primitive initially.
  */
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      /*
        TUTOR'S GUIDANCE:
        "Setting Complex State Objects"
        Because we require both a Header text and a Paragraph text mapping out UI Modal gracefully, 
        we must pack our configuration directly into a cohesive standard Javascript Object mapping!
      */
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).'
      });
      return;
    }
    console.log(enteredUsername, enteredAge);
    props.onAddUser(enteredUsername, enteredAge);

    setEnteredUsername('');
    setEnteredAge('');
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
    // console.log(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
    // console.log(event.target.value);
  };

  /*
    TUTOR'S GUIDANCE:
    "Resetting Modal Flags"
    When the user explicitly taps the generic 'Okay' Button or touches the transparent `.backdrop`, 
    this unique module explicitly overrides your state map back into `null`, destroying the JSON configuration!
  */
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {/*
        TUTOR'S GUIDANCE:
        "Conditional JSX Execution"
        If `error` is populated, it natively passes standard Javascript 'truthy' evaluations. Thus the specific 
        `&&` condition evaluates and cleanly appends the `<ErrorModal />` right inside the DOM tree alongside 
        your custom string props gracefully!
      */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
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
    </div>
  );
};

export default AddUser;
