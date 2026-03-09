import React from 'react';

import './Card.css';

const Card = (props) => {
  // Reusable wrapper components often combine their own base styles with
  // classes provided by the parent component.
  const classes = 'card ' + props.className;

  // props.children represents the JSX nested inside <Card>...</Card>, which
  // lets this component act as a flexible shell around other content.
  return <div className={classes}>{props.children}</div>;
};

export default Card;
