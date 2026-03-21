import React from 'react';

import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

/*
  TUTOR'S GUIDANCE:
  "Adjacent JSX Container Fix"
  As the tutor explains, React compiler natively expects ONE root node returned structurally.
  You cannot write `<div className={classes.backdrop} />` next to `<Card />` natively because they 
  would be adjacent siblings! Here, we solve it temporarily by mapping everything entirely inside 
  a single `<div>` block!
*/
const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
