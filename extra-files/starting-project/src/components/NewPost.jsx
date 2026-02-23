// This component renders a form for creating a new post. It demonstrates
// that components can contain standard HTML form elements (textarea, input,
// label) alongside the React-specific conventions we've already seen.
//
// This form will eventually be used to add new posts to the list. For now,
// it is rendered above the posts list as a stepping stone — the next
// lessons will connect typing in this form to updating the displayed posts,
// which introduces the concept of "state".

// --- Lifting State Up (this component's role) ---
//
// Previously, this component held its own state (via useState) for the
// textarea value. However, the state was needed in a SIBLING component
// (Post, via PostsList) — not here. React's data flow is one-directional
// (parent → child via props), so a child cannot directly share state with
// a sibling.
//
// The solution is "lifting state up": move the state to the nearest
// common ancestor that has access to BOTH the component where the event
// occurs (NewPost) and the component that needs the data (Post). In this
// case, that ancestor is PostsList.
//
// After lifting, NewPost no longer owns any state. Instead, it receives
// handler functions from its parent via props (onBodyChange,
// onAuthorChange) and forwards them to the native onChange events on
// <textarea> and <input>. This is possible because functions are regular
// JavaScript values — they can be passed through props just like strings
// or numbers.

import classes from './NewPost.module.css';

// NewPost now accepts props instead of managing its own state.
// The parent (PostsList) passes handler functions that will be called
// whenever the user types into the textarea or the name input.
function NewPost(props) {
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
        {/* The handler function received via props.onBodyChange is passed
            directly to onChange. When the change event fires, React calls
            this function with the event object — the same object that
            PostsList's bodyChangeHandler will receive. This is how a
            parent component can react to events that happen inside a
            child component's JSX. */}
        <textarea id="body" required rows={3} onChange={props.onBodyChange} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        {/* Same pattern for the author input — the handler function is
            passed in from the parent via props.onAuthorChange. */}
        <input type="text" id="name" required onChange={props.onAuthorChange} />
      </p>
    </form>
  );
}

export default NewPost;
