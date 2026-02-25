// --- NewPost: Using React Router Actions for Data Submission ---
//
// This component has been dramatically simplified. Previously it was
// responsible for:
//   - Managing form input state with useState (enteredBody, enteredAuthor)
//   - Updating state on every keystroke via onChange handlers
//   - Manually handling form submission (preventDefault, building postData)
//   - Calling a callback prop to send data to the parent
//
// All of that has been replaced by React Router's ACTION feature, which
// is the data-submission counterpart to the LOADER feature used for
// data fetching:
//   - Loaders  → fetch data BEFORE a route renders (GET)
//   - Actions  → handle data AFTER a form submission  (POST/PUT/DELETE)
//
// The component no longer uses useState, onChange, onSubmit, or any
// callback props. Instead, it uses React Router's <Form> component and
// the HTML "name" attribute on inputs to let React Router collect and
// process the form data automatically.

// --- Link for Cancel Navigation ---
//
// The cancel button has been replaced with a Link component. Instead
// of calling an onCancel callback prop (which no longer exists), it
// navigates to the parent route ("..") when clicked — closing the
// modal by leaving the /create-post route.
import { Link, Form, redirect } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './NewPost.module.css';

// --- Route Action Function ---
//
// Just like a loader is a function that React Router calls before
// rendering a route, an ACTION is a function that React Router calls
// when a <Form> inside that route is submitted.
//
// The action function:
//   1. Is exported from the same file as the route component (convention)
//   2. Is imported with an alias in main.jsx (e.g., newPostAction) and
//      assigned to the "action" property on the route definition
//   3. Receives an object from React Router containing a "request"
//      property — this is a standard Request object that React Router
//      constructs from the form data (NOT a real HTTP request to a
//      server — everything still runs client-side in the browser)
//   4. Can be async — React Router waits for the Promise to resolve
//
// --- Extracting Form Data ---
//
// The request object has a formData() method that returns a Promise
// resolving to a FormData object. FormData is a built-in browser API
// that holds key-value pairs corresponding to each named form field.
//
// To convert FormData into a plain JavaScript object (e.g.,
// { body: "...", author: "..." }), we use Object.fromEntries(formData).
// This built-in utility creates a simple key-value object from any
// iterable of [key, value] pairs — which is exactly what FormData
// provides when iterated.
//
// The KEYS in the resulting object come from the "name" attribute on
// each form input (e.g., name="body" → { body: "..." }). This is why
// adding name attributes to the inputs is essential.
//
// --- redirect() ---
//
// After the action completes its work (sending data to the backend),
// we want to navigate the user back to the posts list. The redirect()
// function from react-router-dom creates a special Response object.
// When an action returns a redirect Response, React Router reads the
// target path from it and performs client-side navigation — just like
// calling navigate(), but usable outside of component code (actions
// run outside the React component tree, so hooks like useNavigate
// are not available).
export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return redirect('/');
}

// --- Simplified Component ---
//
// With the action handling data extraction and submission, and the
// <Form> component handling the browser's default prevention, this
// component no longer needs:
//   - useState for form inputs
//   - onChange handlers on inputs
//   - onSubmit handler on the form
//   - Any props from a parent (no onAddPost, no onCancel)
//
// The component is now purely presentational: it renders a form inside
// a modal, and React Router handles everything else.
function NewPost() {
  return (
    // --- Modal Wrapper ---
    //
    // Modal handles its own backdrop-click navigation (useNavigate to
    // ".."), so no props are needed.
    <Modal>
      {/* --- React Router's <Form> Component ---

          The Form component (capital F) from react-router-dom replaces
          the standard HTML <form> element. It prevents the browser's
          default submission behavior (no page reload, no HTTP request
          to the hosting server) and instead:

            1. Collects all named input values from the form
            2. Constructs a Request object with the form data
            3. Calls the ACTION function assigned to the currently
               active route, passing the Request object to it

          The method="post" prop is semantically important. It tells
          React Router to set the method property on the constructed
          Request object to "POST". No actual HTTP POST request is
          sent by the Form component — this is still all client-side.
          The method can be used inside the action to determine which
          type of form was submitted (useful when a route has multiple
          forms). Using "post" is also the semantically correct HTTP
          verb for creating a new resource. */}
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          {/* --- The name Attribute ---

              The HTML "name" attribute on form inputs is what allows
              React Router (and the browser's FormData API) to identify
              each field's value when the form is submitted. The name
              becomes the KEY in the resulting FormData/Object:
                name="body"   → { body: "user's text" }
                name="author" → { author: "user's name" }

              Without a name attribute, the input's value would not be
              included in the form data at all.

              The required attribute still provides browser-native
              validation — the form cannot be submitted while the field
              is empty. This works with React Router's Form just as it
              does with a regular <form>. */}
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        {/* --- Cancel as a Link ---

            Link to=".." navigates to the parent route (the posts list),
            effectively closing the modal without submitting. */}
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;
