import React from 'react';

/*
  TUTOR'S GUIDANCE:
  "JSX Accessibility & Functions"
  Notice how we use `htmlFor` instead of the native HTML `for` attribute inside JSX
  labels to avoid conflicting with the reserved Javascript `for` loop syntax!
  
  The `onSubmit` listener gracefully proxy-points directly to `addUserHandler` 
  (without parentheses!) so React executes it strictly only when the form triggers.
*/
const AddUser = (props) => {
  const addUserHandler = (event) => {
    // Prevent the default browser HTTP Request and page reload sequence!
    event.preventDefault();
  };

  return (
    <form onSubmit={addUserHandler}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" />
      <label htmlFor="age">Age (Years)</label>
      <input id="age" type="number" />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
