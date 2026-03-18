import React from 'react';
import classes from './Button.module.css';

/*
  TUTOR'S GUIDANCE:
  "Wrapper Components"
  Similar to our Card, this custom Button acts as an intelligent intermediary. It accepts properties 
  like a form 'type' and an 'onClick' listener, and proxy-forwards them directly to the native 
  HTML `<button>` component!

  Notice the safe fallback (`props.type || 'button'`). If a developer attempts to render 
  this UI Button without declaring a submit or reset type, it gracefully defaults to a generic 
  'button' so it doesn't accidentally trigger a form submission.
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
