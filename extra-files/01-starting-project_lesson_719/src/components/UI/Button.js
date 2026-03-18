import React from 'react';
import classes from './Button.module.css';

/*
  TUTOR'S GUIDANCE:
  "Wrapper Components"
  We proxy our custom button mapping into the native DOM element. Note how we establish 
  a fallback type: `props.type || 'button'`. This prevents the `<button>` from accidentally 
  reloaded forms if a user forgets to assign it!
*/
const Button = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
