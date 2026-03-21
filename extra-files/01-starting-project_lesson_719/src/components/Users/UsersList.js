import React from 'react';

import Card from '../UI/Card';
import classes from './UsersList.module.css';

/*
  TUTOR'S GUIDANCE:
  "Component Responsibility & Separation of Concerns"
  Although we technically *could* have jammed this list logic directly back into the `<AddUser>` file,
  it violates standard React architecture. We shouldn't rely on an "Add User" block to simultaneously
  track and output our database rendering! 

  By defining `<UsersList />` strictly as a standalone piece, it blindly reads and maps array outputs
  pushed directly downward upon the `props.users` mapping without ever having to manage global state limits
  on its own.
  
  Since we expect `props.users` to strictly evaluate out to an Array filled with Objects,
  we use javascript's native `.map()` operator to return beautiful DOM <li> components 
  for every snapshot stored within!
*/
const UsersList = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
