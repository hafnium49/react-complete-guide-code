import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  /*
    TUTOR'S GUIDANCE:
    "Application Master State"
    Here is our root index of our registered users. By initiating it empty, the 
    conditional rules and `map` limits established in the children won't throw errors!
  */
  const [usersList, setUsersList] = useState([]);

  /*
    TUTOR'S GUIDANCE:
    "Handling Lifted State Data"
    When `<AddUser>` completes its validation routines and triggers `props.onAddUser()`, 
    this handler catches the newly generated metadata string values. 
    
    Using the `(prevUsersList)` parameter architecture, we spread the legacy records 
    out safely then append our uniquely minted profile into the newly generated state heap!
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
