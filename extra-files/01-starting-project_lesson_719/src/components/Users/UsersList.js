import React from 'react';

import Card from '../UI/Card';
import classes from './UsersList.module.css';

/*
  TUTOR'S GUIDANCE:
  "Stateless Presentational Component"
  The UsersList doesn't track any of its own state! It blindly trusts and maps 
  whatever `props.users` array App.js sends down the module pipeline.
*/
const UsersList = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {/*
          TUTOR'S GUIDANCE:
          "Mapping Keys"
          We render dynamic `<li>` tags directly from our passed down Array iterator.
          A unique mathematical ID gets bound to the `key` to please React's Virtual DOM.
        */}
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
