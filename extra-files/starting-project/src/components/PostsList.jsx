// --- Composing Components ---
//
// React applications are built by composing components — nesting them
// inside each other to form a tree. This PostsList component demonstrates
// that pattern: it imports the Post component and uses it multiple times
// inside an <ul> (unordered list).
//
// The component hierarchy so far looks like this:
//   main.jsx  renders  <App />
//   App.jsx   renders  <MainHeader /> + <PostsList />
//   PostsList renders  <Modal><NewPost /></Modal> + <Post /> (multiple)
//
// Each level focuses on one responsibility:
//   - App is the root component and owns the modal visibility state
//   - MainHeader renders the page header with the "New Post" button
//   - PostsList manages the form and the list layout
//   - Modal wraps the form in an overlay dialog
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

import { useEffect, useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

// --- Receiving Lifted State via Props ---
//
// The modalIsVisible state that used to live here has been lifted up to
// App, because a sibling component (MainHeader) now also needs to
// interact with it. PostsList receives two new props instead:
//   isPosting     — a boolean indicating whether the modal should show
//   onStopPosting — a handler function to call when the modal closes
//
// This demonstrates that state can travel through MULTIPLE levels:
//   App (owns state) → PostsList (receives via isPosting) → Modal
//     (receives the hide handler via onClose, originally from App)
//
// At each level, the prop name can differ from the original state
// variable name. What matters is that the VALUE flows correctly. The
// prop name should describe meaning from that component's perspective.
function PostsList({ isPosting, onStopPosting }) {
  // --- Managing a List with useState ---
  //
  // State values can be of ANY JavaScript type — not just strings or
  // booleans. Here the state is an ARRAY that will hold post objects.
  // The initial value is an empty array ([]), meaning the list starts
  // with no posts. Each time the user submits the form, a new object
  // is prepended to this array, and React re-renders the component to
  // reflect the updated list.
  const [posts, setPosts] = useState([]);

  // --- useEffect: Running Side Effects Safely ---
  //
  // A "side effect" is any action that does not directly produce JSX
  // output but may indirectly affect the UI later — sending HTTP
  // requests, setting up timers, accessing browser APIs, etc.
  //
  // Why not just call fetch() directly in the component body?
  // Because every state update causes React to re-execute the
  // component function. If a fetch() call inside the body updates
  // state, that triggers ANOTHER re-execution, which sends ANOTHER
  // fetch, which updates state again — an infinite loop.
  //
  // useEffect solves this by letting React control WHEN the effect
  // function runs. It takes two arguments:
  //
  //   1. An EFFECT FUNCTION — the code to execute (e.g., fetch data).
  //      React calls this function FOR you at the right time.
  //
  //   2. A DEPENDENCY ARRAY — a list of values that the effect depends
  //      on. React compares these values between renders and only
  //      re-runs the effect when at least one has changed.
  //
  //      - []  (empty array) = no dependencies → the effect runs ONCE,
  //        after the component's first render. It never runs again,
  //        because there are no values to change. This is perfect for
  //        one-time data fetching on component mount.
  //
  //      - [someVar] = the effect re-runs whenever someVar changes.
  //
  //      - omitting the array entirely = the effect runs after EVERY
  //        render (rarely what you want).
  //
  // --- Why Not async on the Effect Function? ---
  //
  // The function passed to useEffect must return either nothing or a
  // "cleanup function" (used for teardown tasks like removing event
  // listeners). Adding async to a function always makes it return a
  // Promise, which violates this contract. The workaround is to
  // define a separate async function INSIDE the effect and call it
  // immediately. This lets you use await for cleaner code while
  // keeping the outer effect function synchronous.
  //
  // --- Execution Timing ---
  //
  // The effect runs AFTER the component renders, not before. So on
  // the very first render, posts is still [] and the empty-state
  // fallback appears briefly. Then the effect fires, fetches data,
  // calls setPosts, which triggers a second render with the fetched
  // posts. In practice this happens so fast that the user typically
  // sees only the final result.
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:8080/posts');
      const resData = await response.json();
      setPosts(resData.posts);
    }

    fetchPosts();
  }, []);

  // --- The Function Form of State Updates ---
  //
  // When the NEW state depends on the PREVIOUS state (e.g., adding an
  // item to an existing array), you should pass a FUNCTION to the state
  // updater instead of a plain value. React calls this function with the
  // most recent state snapshot as its argument and uses the return value
  // as the new state.
  //
  // Why not just write setPosts([postData, ...posts])?
  // React does not apply state updates instantly — it SCHEDULES them.
  // If multiple updates are queued in rapid succession, the "posts"
  // variable captured in the closure might be stale (it reflects the
  // state at the time the component last rendered, not necessarily the
  // latest pending value). The function form guarantees that
  // "existingPosts" is always the most up-to-date snapshot, even when
  // several updates are pending at once.
  //
  // Rule of thumb: whenever your new state depends on the old state,
  // use the function form. This applies to arrays, numbers (counters),
  // objects — any state type where the update is relative to the
  // current value.
  //
  // --- The Spread Operator (...) ---
  //
  // The spread operator (...existingPosts) copies every element from
  // the existing array into the new array. By placing postData BEFORE
  // the spread, the newest post appears first in the list. Without the
  // spread, the old posts would be lost — you would always end up with
  // an array containing only the single new post.
  // --- Sending HTTP Requests with fetch() ---
  //
  // The fetch() function is a built-in browser API (NOT a React feature)
  // for sending HTTP requests. Despite its name, it can be used to SEND
  // data as well as retrieve it.
  //
  // fetch(url, options) takes two arguments:
  //   1. The URL to send the request to. Here it points to the dummy
  //      backend running on localhost:8080. The /posts path matches the
  //      POST /posts route defined in the backend's app.js.
  //   2. An optional configuration object where you can set:
  //      - method: The HTTP method. fetch() defaults to GET, so we
  //        explicitly set it to "POST" to create a new resource.
  //      - body: The data to attach to the request. HTTP request bodies
  //        must be strings, so we use JSON.stringify() to convert our
  //        JavaScript postData object into a JSON string.
  //      - headers: An object of HTTP headers. The "Content-Type" header
  //        tells the backend what format the body is in. Setting it to
  //        "application/json" lets the backend's body-parser middleware
  //        know to parse the incoming body as JSON.
  //
  // fetch() returns a Promise, but for now we are not waiting for or
  // using the response — we just "fire and forget." The backend receives
  // the data, stores it in posts.json, and sends back a response, but
  // we don't need it here because we already update the local state
  // optimistically (immediately adding the post to the UI). Fetching
  // data FROM the backend will be handled in the next lesson.
  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  // NewPost (the form) and <ul> (the list) are siblings, so they need
  // a single root wrapper. Here we use a Fragment (<>...</>) — the
  // empty opening and closing tags — which satisfies React's one-root-
  // element rule without adding any extra DOM node to the page.
  return (
    <>
      {/* --- Conditional Rendering ---

          React does not have a built-in "if" directive like some template
          languages. Instead, you use plain JavaScript expressions inside
          curly braces to decide what gets rendered. There are three common
          patterns:

          1. TERNARY EXPRESSION  (condition ? <A /> : <B />)
             Renders one thing when true and another when false. Use null
             or false as the "else" branch to render nothing:
               {isPosting ? <Modal>...</Modal> : null}

          2. VARIABLE APPROACH
             Declare a variable (e.g., let modalContent) that defaults to
             nothing. Then use a regular if-statement to assign JSX to it
             when the condition is true. Finally, output that variable in
             the returned JSX with {modalContent}. This keeps the returned
             JSX cleaner when the conditional block is large.

          3. LOGICAL AND OPERATOR  (condition && <A />)
             JavaScript's && returns the right-hand operand when the
             left-hand side is truthy, or the left-hand value when it is
             falsy. Since React skips rendering for false, null, and
             undefined, writing {isPosting && <Modal>...</Modal>}
             renders Modal only when isPosting is true — and renders
             nothing when it is false.

          All three approaches are valid. The && pattern is used here
          because it is concise and reads naturally for show-or-hide
          scenarios where there is no "else" branch to render. */}
      {/* The isPosting prop (from App) controls visibility. The
          onStopPosting prop (also from App) is forwarded to Modal's
          onClose, which attaches it to the backdrop's onClick. So the
          chain is: backdrop click → onClose → onStopPosting →
          hideModalHandler in App → setModalIsVisible(false) → App
          re-renders → isPosting becomes false → this block disappears. */}
      {isPosting && (
        <Modal onClose={onStopPosting}>
          {/* onCancel reuses the same onStopPosting function that Modal
              receives via onClose. Both the backdrop click and the cancel
              button should produce the same result — closing the modal.
              NewPost no longer receives onBodyChange or onAuthorChange
              because it now manages its own input state internally. */}
          {/* onAddPost passes addPostHandler to NewPost. When the form
              is submitted, NewPost calls onAddPost(postData), which
              executes addPostHandler here — adding the new post object
              to the posts array via setPosts. */}
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {/* --- Rendering Lists Dynamically with .map() ---

          React can render an ARRAY of JSX elements. If you place an
          array like [<p>A</p>, <p>B</p>] inside curly braces, React
          renders every element in order. This means you can transform
          a data array into a JSX array and output it directly.

          Array.prototype.map() is the standard JavaScript method for
          this. It takes a function that is called once for each item
          in the source array. Whatever that function returns becomes
          the corresponding item in the NEW array. Here, each post
          object { body, author } is mapped to a <Post> JSX element.

          --- The key Prop ---

          When rendering a list with .map(), React requires a special
          prop called key on each element. key is NOT a prop you
          define or use inside the component — it is consumed
          internally by React. Its purpose is to give React a stable
          identity for each list item so that when the array changes
          (items added, removed, or reordered), React can efficiently
          determine which DOM nodes to create, update, or remove
          rather than re-rendering the entire list from scratch.

          The value must be UNIQUE among siblings. Ideally it should
          be a stable identifier like a database ID. Here we use
          post.body as a stand-in; in a production app you would use
          a proper unique ID to avoid collisions.

          Omitting key still works, but React logs a warning and may
          exhibit subtle bugs with reordering or component state. */}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {/* --- Empty-State Fallback ---

          When the posts array has no items, we show a friendly
          message instead of an empty page. This uses the same &&
          conditional rendering pattern: posts.length === 0 is truthy
          only when the array is empty.

          --- Inline Styles in JSX ---

          JSX accepts a style prop as a JavaScript OBJECT (not a CSS
          string). Property names use camelCase instead of kebab-case:
            textAlign   instead of  text-align
            fontSize    instead of  font-size
          The outer curly braces open a dynamic expression; the inner
          curly braces define the object literal. Values are strings
          (or numbers for pixel values). */}
      {posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
