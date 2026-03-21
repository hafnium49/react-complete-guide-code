import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  /*
    TUTOR'S GUIDANCE:
    "Application Master State"
    Here is our centralized tracking array natively storing the application session!
    Since the list evaluates initially out as empty `[]`, our `UsersList` component 
    binds to it structurally without throwing rendering `null` map faults natively!
  */
  const [usersList, setUsersList] = useState([]);

  /*
    TUTOR'S GUIDANCE:
    "Handling Lifted State Data"
    Once `<AddUser>` completes its validation routines, it fires data safely backwards 
    into this `addUserHandler()` listening directly via our custom `onAddUser` prop. 
    
    Using the `(prevUsersList) =>` parameter syntax, we safely intercept previous array variables 
    without physically mutating standard objects. We dynamically forge a bespoke generic `id` property
    by calling `Math.random().toString()` alongside the payload mappings so React can uniquely index 
    the lists optimally natively!
  */
  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
