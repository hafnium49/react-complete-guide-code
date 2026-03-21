import React from 'react';

import classes from './Card.module.css';

/*
  TUTOR'S GUIDANCE:
  "Wrapper Components & Template Literals"
  Our `Card` is fundamentally a structural shell logic!
  
  Since this is a custom component, we don't automatically receive the native 'className' prop mapping. 
  By directly capturing `props.className` and injecting it via `${...}` template literal backticks alongside 
  our internal `${classes.card}` block, we successfully combine (concat) internal styles with any external 
  classes our wrapper children want to apply without squashing either of them!
*/
const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
