import React from 'react';
import classes from './Card.module.css';

/*
  TUTOR'S GUIDANCE:
  "Wrapper Components"
  If you examine the CSS hints provided in the course instructions, you'll see a beautiful
  container with rounded corners. Our `Card` is basically a highly reusable UI shell. 
  
  To ensure we don't wipe out custom classes that get passed down (like an explicit width 
  or margin requested by the parent), we use standard Javascript template literals to seamlessly 
  weave `classes.card` with our incoming `props.className` variable!
  
  Lastly, using `{props.children}` dynamically extracts and injects literally everything nested 
  *between* the <Card> tags wherever they are called.
*/
const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};

export default Card;
