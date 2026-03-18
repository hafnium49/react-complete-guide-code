import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  /*
    TUTOR'S GUIDANCE:
    "Application Master State"
    Here is our root index of registered users natively storing the application state!
    Since the list evaluates out as empty initially `[]`, our `UsersList` map iterator 
    components and conditional rendering routines won't throw startup errors!
  */
  const [usersList, setUsersList] = useState([]);

  /*
    TUTOR'S GUIDANCE:
    "Handling Lifted State Data"
    Once `<AddUser>` strictly completes its local verification logic (stripping bad ages or 
    empty username inputs), it fires data safely back upwards into `addUserHandler()`. 
    
    Using the previous parameter injection strategy `(prevUsersList) =>`, we isolate and explode 
    `...prevUsersList` then concatenate newly generated generic IDs and mapped data without physically 
    mutating original states!
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
