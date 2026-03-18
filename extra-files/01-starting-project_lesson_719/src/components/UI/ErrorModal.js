import React from 'react';

import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

/*
  TUTOR'S GUIDANCE:
  "Conditional Layouts & Modal Positioning"
  We utilize two completely independent divs here dynamically intercepting the DOM rendering! 
  
  The invisible `backdrop` intercepts uncontrolled background clicking (we map `onClick` directly 
  so that it physically closes the modal when you accidentally misclick outside the primary alert box).
  Our embedded `<Card className={classes.modal}>` functions as our beautiful CSS framework floating 
  dynamically over the disabled UI content underneath!
*/
const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
