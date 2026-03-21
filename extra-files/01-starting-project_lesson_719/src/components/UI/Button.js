import React from 'react';
import classes from './Button.module.css';

/*
  TUTOR'S GUIDANCE:
  "Wrapper Components"
  Similar to our custom Card component, this button is a reusable layout wrapper 
  designed to apply a standardized style across our entire application uniformly!
  
  Notice how we elegantly proxy external parameters down to the built-in HTML `<button>` 
  node. By evaluating `props.type || 'button'`, we natively protect the component 
  from accidentally reloading pages on click if a fellow developer forgets to pass 
  a `type` flag during rendering. We also map the universal onClick proxy prop downward.
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
