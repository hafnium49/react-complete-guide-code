import React from 'react';

import Card from '../UI/Card';
import classes from './UsersList.module.css';

/*
  TUTOR'S GUIDANCE:
  "Stateless Data Consumers"
  Our output display has zero awareness of how its list generates! It blindly extracts 
  the mapped prop arrays generated downstream off `App.js` and builds Virtual DOM nodes.
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
