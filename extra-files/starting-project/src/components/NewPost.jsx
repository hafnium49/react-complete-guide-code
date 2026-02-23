// This component renders a form for creating a new post. It demonstrates
// that components can contain standard HTML form elements (textarea, input,
// label) alongside the React-specific conventions we've already seen.
//
// This form will eventually be used to add new posts to the list. For now,
// it is rendered above the posts list as a stepping stone — the next
// lessons will connect typing in this form to updating the displayed posts,
// which introduces the concept of "state".

// --- Why a regular variable won't trigger UI updates ---
//
// You might think you could store user input in a plain variable (let or
// var) and output it in JSX with curly braces. That will NOT work because
// React only takes a "snapshot" of the JSX returned by the component
// function when it first executes. If you later change a plain variable
// inside an event handler, React has no way of knowing the JSX output
// should be different — it does not re-execute the component function
// just because a variable changed.
//
// To make the UI update in response to changing data, you must use
// React's state system (the useState hook), which tells React "this
// value matters — re-render the component whenever it changes."

// --- React Hooks ---
//
// React provides built-in functions whose names start with "use"
// (useState, useEffect, useRef, etc.). These are called "React Hooks."
//
// Rules of Hooks:
//   - Hooks must be called INSIDE a component function (or inside
//     another custom hook). Calling them in a regular JavaScript
//     function will produce an error.
//   - Hooks must be called at the top level of the component — not
//     inside if-statements, loops, or nested functions.

// --- useState ---
//
// useState is the most fundamental hook. It registers a piece of state
// that belongs to this component instance.
//
// Calling useState(initialValue) returns an array with exactly two
// elements:
//   [0] — the CURRENT state value (initially whatever you passed in)
//   [1] — a STATE UPDATING FUNCTION you call to set a new value
//
// Using array destructuring (a standard JavaScript feature), we name
// them descriptively: e.g., [enteredBody, setEnteredBody].
// The convention is to name the updater "set" + the state name.
//
// When you call the updater (e.g., setEnteredBody("new value")):
//   1. React stores the new value in memory.
//   2. React re-executes the component function.
//   3. On this new execution, enteredBody holds the updated value.
//   4. React compares the new JSX snapshot with the previous one and
//      updates ONLY the parts of the DOM that actually changed (this
//      selective updating is what makes React efficient).
//
// Because every state update triggers a fresh function execution,
// enteredBody can be declared with const — it is a brand-new constant
// on every render, not a variable that is mutated in place.
import { useState } from 'react';

import classes from './NewPost.module.css';

function NewPost() {
  // Register a state slice for the textarea value. The initial value is
  // an empty string. enteredBody always holds the latest snapshot;
  // setEnteredBody is used to request a new value + re-render.
  const [enteredBody, setEnteredBody] = useState('');

  // --- Event Listeners in React (Declarative Approach) ---
  //
  // In vanilla JavaScript, you would use querySelector to find an element
  // and then call addEventListener to attach a handler. That is the
  // imperative approach — step-by-step instructions.
  //
  // In React, you attach event listeners declaratively by adding a special
  // prop whose name starts with "on" followed by the event name in camelCase:
  //   onChange, onClick, onKeyDown, onSubmit, etc.
  //
  // You pass a function as the value of this prop. React will call that
  // function whenever the event fires. IMPORTANT: you pass the function
  // itself (changeBodyHandler), NOT the result of calling it
  // (changeBodyHandler()). Functions in JavaScript are values — just like
  // strings or numbers — so they can be passed as props.

  // --- Handler Functions ---
  //
  // It is common to define the handler function inside the component
  // function (functions inside functions are standard JavaScript — not a
  // React-specific feature). A naming convention is to end handler
  // function names with "Handler" to signal their purpose, but this is
  // optional.
  //
  // React automatically passes an event object as the first argument to
  // the handler, just like the browser does with addEventListener. This
  // object contains useful information, including event.target (the DOM
  // element that triggered the event) and event.target.value (the current
  // value of an input or textarea).
  function changeBodyHandler(event) {
    // Instead of console.log, we now call the state updater. This stores
    // the new value AND tells React to re-execute this component function,
    // so that the JSX below reflects the latest input.
    setEnteredBody(event.target.value);
  }

  // --- htmlFor (not for) ---
  //
  // Just as the HTML "class" attribute becomes "className" in JSX,
  // the HTML "for" attribute (used on <label> to link it to an input)
  // becomes "htmlFor" in JSX. The reason is the same: "for" is a
  // reserved keyword in JavaScript (it's used for for-loops).
  //
  // These two — className and htmlFor — are the most common attribute
  // name differences between HTML and JSX. Most other HTML attributes
  // keep their original names.
  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        {/* onChange fires on every keystroke and paste. The handler calls
            setEnteredBody, which triggers a re-render with the new value. */}
        <textarea id="body" required rows={3} onChange={changeBodyHandler} />
      </p>
      {/* This paragraph outputs the current state value. On the initial
          render it is empty. Each time the user types, setEnteredBody
          causes a re-render and enteredBody holds the updated text. */}
      <p>{enteredBody}</p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required />
      </p>
    </form>
  );
}

export default NewPost;
