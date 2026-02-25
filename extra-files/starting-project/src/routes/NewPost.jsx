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

// --- Link for Cancel Navigation ---
//
// The cancel button has been replaced with a Link component. Instead
// of calling an onCancel callback prop (which no longer exists), it
// navigates to the parent route ("..") when clicked — closing the
// modal by leaving the /create-post route. This follows the same
// pattern used in MainHeader: declarative navigation via Link for
// user-initiated click actions.
import { Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './NewPost.module.css';

// --- Self-Contained Route Component ---
//
// With routing handling both opening (Link in MainHeader) and closing
// (navigate in Modal, Link for cancel), this component no longer needs
// onCancel as a prop. The onAddPost prop is also not received from any
// parent when this component is loaded as a route. Form submission
// handling will be reworked in an upcoming lesson using React Router's
// action functions.
function NewPost({ onAddPost }) {
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
    // Modal no longer needs an onClose prop — it handles backdrop clicks
    // internally using useNavigate to go to the parent route ("..").
    <Modal>
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
        {/* --- Cancel as a Link Instead of a Button ---

            Previously the cancel button called onCancel (a prop holding
            App's hideModalHandler). With routing, "cancel" simply means
            "navigate away from /create-post." A Link component is the
            right tool for this — it creates an accessible <a> element
            that triggers client-side navigation without a page reload.

            The "to" prop specifies the navigation target. Using ".."
            (a relative path) means "go up to the parent route." This
            is analogous to "cd .." in a terminal. For /create-post,
            the parent route is "/", so clicking Cancel takes the user
            back to the posts list.

            Using ".." instead of an absolute path like "/" makes the
            component more portable — if the route structure changes
            (e.g., /create-post moves under /posts/create-post), the
            relative navigation still works correctly without edits. */}
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
