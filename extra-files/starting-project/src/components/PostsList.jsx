// --- Composing Components ---
//
// React applications are built by composing components — nesting them
// inside each other to form a tree. This PostsList component demonstrates
// that pattern: it imports the Post component and uses it multiple times
// inside an <ul> (unordered list).
//
// The component hierarchy so far looks like this:
//   main.jsx  renders  <App />
//   App.jsx   renders  <PostsList />
//   PostsList renders  <NewPost /> + <Post /> (multiple instances)
//
// Each level focuses on one responsibility:
//   - App is the root component (entry point of the component tree)
//   - PostsList manages the form and the list layout
//   - NewPost renders the form for creating a new post
//   - Post renders a single list item
//
// This separation keeps each component small and focused. As the
// application grows, you continue breaking the UI into more components
// and composing them together in the same way.

// --- Naming Conventions ---
//
// It is good practice to put each component in its own file. File names
// should describe the component's purpose and use PascalCase (also known
// as upper camel case) — each sub-word starts with a capital letter
// (e.g., PostsList, not posts-list or postslist).
// The same convention applies to the function name inside the file.

// --- Why a regular variable won't trigger UI updates ---
//
// You might think you could store user input in a plain variable (let or
// var) and output it in JSX with curly braces. That will NOT work because
// React only takes a "snapshot" of the JSX when the component function
// first executes. If you later change a plain variable inside an event
// handler, React does not know the JSX output should be different — it
// does not re-execute the component function just because a variable
// changed.
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
//
// You can call useState multiple times in the same component to register
// as many independent state slices as you need. Whenever ANY of them
// changes, React re-executes the entire component function, which means
// all nested child components re-render too — ensuring that updated
// state values passed as props are reflected everywhere in the UI.
import { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList() {
  // --- Lifting State Up ---
  //
  // The state for the post body and author lives HERE (PostsList) rather
  // than in NewPost, because PostsList is the nearest common ancestor of
  // both NewPost (where the user types) and Post (where the value is
  // displayed). This pattern is called "lifting state up."
  //
  // The flow:
  //   1. PostsList registers the state (enteredBody, enteredAuthor).
  //   2. PostsList passes handler functions down to NewPost as props.
  //   3. NewPost forwards those handlers to onChange on <textarea>/<input>.
  //   4. When the user types, the handler fires, calling the state
  //      updater here in PostsList.
  //   5. PostsList re-renders, passing the updated state values as props
  //      to Post, which displays them on screen.
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

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
  // itself (bodyChangeHandler), NOT the result of calling it
  // (bodyChangeHandler()). Functions in JavaScript are values — just like
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

  // These handlers are passed to NewPost as props, then forwarded to the
  // native onChange events on <textarea> and <input>. Each handler calls
  // its respective state updater, which triggers a re-render of PostsList
  // and all its children (including Post).
  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  // NewPost (the form) and <ul> (the list) are siblings, so they need
  // a single root wrapper. Here we use a Fragment (<>...</>) — the
  // empty opening and closing tags — which satisfies React's one-root-
  // element rule without adding any extra DOM node to the page.
  return (
    <>
      {/* Wrapping NewPost inside Modal demonstrates the wrapper component
          pattern. Modal uses its children prop to render whatever is placed
          between its opening and closing tags — in this case, the NewPost
          form. This gives us the backdrop overlay and centered dialog
          styling from Modal without NewPost needing to know about it. */}
      <Modal>
        <NewPost onBodyChange={bodyChangeHandler} onAuthorChange={authorChangeHandler} />
      </Modal>
      <ul className={classes.posts}>
        {/* The first Post now receives the live state values as props.
            Every keystroke updates the state, which causes PostsList to
            re-render, which in turn re-renders Post with the new values. */}
        <Post author={enteredAuthor} body={enteredBody} />
        <Post author="Manuel" body="Check out the full course!" />
      </ul>
    </>
  );
}

export default PostsList;
