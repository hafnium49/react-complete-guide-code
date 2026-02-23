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

// --- Switching from props.xyz to Object Destructuring ---
//
// Previously this function used the props parameter and accessed
// values with props.onBodyChange, props.onAuthorChange, etc.
// Destructuring extracts those properties directly in the parameter
// list, making each usage shorter and making the component's expected
// props visible at a glance. This is the same technique used in Modal
// and PostsList — it is purely a readability preference, not a
// behavioral change.
//
// The new onCancel prop receives a function that closes the modal.
// It will be wired to the cancel button's onClick event below.
function NewPost({ onBodyChange, onAuthorChange, onCancel }) {
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
        {/* The handler function received via onBodyChange (destructured
            from props) is passed directly to onChange. When the change
            event fires, React calls this function with the event object —
            the same object that PostsList's bodyChangeHandler will
            receive. This is how a parent component can react to events
            that happen inside a child component's JSX. */}
        <textarea id="body" required rows={3} onChange={onBodyChange} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        {/* Same pattern for the author input — the handler function is
            passed in from the parent via onAuthorChange. */}
        <input type="text" id="name" required onChange={onAuthorChange} />
      </p>
      {/* --- Buttons Inside a Form ---

          By default, ANY <button> inside a <form> acts as a submit
          button. Clicking it fires the form's submit event AND causes
          the browser to generate an HTTP request to the server — the
          traditional server-side form handling behavior.

          In a React application we typically handle form data entirely
          on the client side, so we do NOT want the browser's default
          submission. (Preventing it will be handled in a later lesson
          when we add an onSubmit handler to the form.)

          To stop a specific button from triggering submission at all,
          set its type attribute to "button". A plain type="button"
          element fires a click event but does NOT submit the form.

          The other button keeps type="submit" (which is the default
          even if you omit the attribute). It WILL trigger form
          submission when clicked — exactly the behavior we want for
          the "Submit" action. */}
      <p className={classes.actions}>
        {/* The cancel button uses type="button" so clicking it does
            NOT submit the form. Instead, onClick calls onCancel, which
            traces back through PostsList's onStopPosting to App's
            hideModalHandler — closing the modal without submitting. */}
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        {/* type="submit" is the default for buttons in a form, so it
            could be omitted. Including it explicitly makes the intent
            clear. Clicking this button will trigger the form's submit
            event (handled in a future lesson). */}
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
