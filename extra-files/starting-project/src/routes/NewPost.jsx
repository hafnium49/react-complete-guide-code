// --- NewPost as a Route Component ---
//
// This component has been moved from components/ to routes/ because it
// is now rendered by React Router as its own route (/create-post), not
// embedded inside another component via props.
//
// Previously, PostsList was responsible for wrapping NewPost in a Modal
// and controlling when it appeared (via the isPosting state). Now that
// routing handles "when" this component appears (based on the URL), the
// Modal wrapper has moved HERE — NewPost itself is responsible for
// rendering the modal overlay around its form.

// --- Moving State Back Down ---
//
// Previously the enteredBody and enteredAuthor state was "lifted up" to
// PostsList so that a sibling Post component could display the live
// values. That approach is no longer needed because the posts will be
// rendered from a dynamic list rather than wired to individual state
// variables. The form input state has therefore moved BACK into NewPost
// — the component where the input events actually occur.
//
// This illustrates an important principle: state should live as CLOSE as
// possible to the code that uses it. When multiple components needed the
// values, lifting up was correct. Now that only NewPost needs them (to
// bundle and submit), keeping them here avoids unnecessary props and
// re-renders in the parent.

import { useState } from 'react';

import Modal from '../components/Modal';
import classes from './NewPost.module.css';

// --- Self-Contained Route Component ---
//
// Because NewPost is now a route component rather than a child rendered
// by PostsList, it no longer receives onCancel or onAddPost as props.
// The cancel/close behavior and form submission logic will need to be
// handled differently — using React Router's navigation features
// (covered in an upcoming lesson). For now, these props are still
// listed but will not function correctly when the component is loaded
// via its route, since no parent is passing them.
function NewPost({ onCancel, onAddPost }) {
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

  // The form input state now lives here again. Because only NewPost
  // needs these values (to collect them on submit), there is no reason
  // to lift them to a parent. Keeping state local avoids unnecessary
  // prop drilling and limits re-renders to this component alone.
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function bodyChangeHandler(event) {
    // console.log(event.target.value);
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    // console.log(event.target.value);
    setEnteredAuthor(event.target.value);
  }

  // --- Handling Form Submission ---
  //
  // The onSubmit prop on a <form> element listens for the browser's
  // native submit event. This event fires when the user clicks a
  // submit button or presses Enter inside a form field.
  //
  // The handler receives the standard event object. The FIRST thing
  // we do is call event.preventDefault(). Without this call, the
  // browser would follow its default behavior: generate an HTTP
  // request and send it to the server hosting the page. That would
  // reload the page and lose all React state. Since React is a
  // client-side library, we handle the data in JavaScript instead.
  //
  // After preventing the default, we bundle the current state values
  // into a plain JavaScript object (postData). This object can then
  // be passed to a parent via a callback prop, stored in a list, or
  // sent to an API — whatever the application requires.
  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };
    onAddPost(postData);
    onCancel();
  }

  return (
    // --- Modal Wrapper (Moved Here from PostsList) ---
    //
    // The Modal component was previously rendered in PostsList, which
    // wrapped NewPost inside it conditionally. Now that NewPost is its
    // own route, it takes ownership of the Modal wrapper. This makes
    // the component self-contained: navigating to /create-post renders
    // NewPost, which automatically appears inside a modal overlay.
    //
    // The onClose prop on Modal will need a navigation function to go
    // back to "/" when the backdrop is clicked. That wiring will be
    // added in an upcoming lesson using React Router's navigation API.
    <Modal onClose={onCancel}>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          {/* onChange fires on every keystroke, updating enteredBody
              via the state updater. The required attribute provides
              basic browser-native validation — the form cannot be
              submitted while this field is empty. */}
          <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required onChange={authorChangeHandler} />
        </p>
        {/* --- Buttons Inside a Form ---

            By default, ANY <button> inside a <form> acts as a submit
            button. Clicking it fires the form's submit event AND causes
            the browser to generate an HTTP request to the server — the
            traditional server-side form handling behavior.

            In a React application we typically handle form data entirely
            on the client side, so we do NOT want the browser's default
            submission — that is why submitHandler calls preventDefault().

            To stop a specific button from triggering submission at all,
            set its type attribute to "button". A plain type="button"
            element fires a click event but does NOT submit the form. */}
        <p className={classes.actions}>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button>Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
