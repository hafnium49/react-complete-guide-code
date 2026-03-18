import React from 'react';
import classes from './Card.module.css';

/*
  TUTOR'S GUIDANCE:
  "Wrapper Components"
  As instructed in Lesson 718, we extract our basic box UI into a reusable wrapper.
  By concatenating our intrinsic `.card` class with `props.className`, we allow parents 
  to pass down customized widths or margins gracefully without overwriting the core aesthetic!
*/
const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};

export default Card;
