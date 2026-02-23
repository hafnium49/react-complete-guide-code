// This component renders a form for creating a new post. It demonstrates
// that components can contain standard HTML form elements (textarea, input,
// label) alongside the React-specific conventions we've already seen.

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

import classes from './NewPost.module.css';

// --- Communicating Data Back Up via Callback Props ---
//
// React's data flow is one-directional: parent → child via props. But
// a child often needs to send data BACK to a parent (e.g., "here is
// the form data the user just submitted"). The pattern for this is a
// "callback prop": the parent defines a function, passes it to the
// child as a prop, and the child CALLS that function with the data as
// an argument. The parent's function then does whatever it needs —
// updating state, making an API call, etc.
//
// onAddPost is such a callback. PostsList defines addPostHandler and
// passes it here as onAddPost. When the form is submitted, NewPost
// calls onAddPost(postData), which executes addPostHandler in
// PostsList and adds the new post to the posts array.
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
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
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
  //
  // Finally, we call onCancel() to close the modal. onCancel is a
  // prop that holds a function (ultimately App's hideModalHandler).
  // Calling it here means: "I'm done submitting — close the form."
  // This is possible because props that hold functions can be
  // INVOKED, not just forwarded to event listeners.
  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };
    // Pass the collected data UP to PostsList by calling the callback
    // prop. This executes addPostHandler in PostsList, which prepends
    // the new post to the posts array via setPosts.
    onAddPost(postData);
    // After adding the post, close the modal.
    onCancel();
  }

  return (
    // --- The onSubmit Event on <form> ---
    //
    // Attaching submitHandler to the form's onSubmit (rather than to
    // the button's onClick) is the recommended pattern. It captures
    // ALL ways a form can be submitted — clicking the submit button
    // OR pressing Enter in a text field — in one place.
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
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
