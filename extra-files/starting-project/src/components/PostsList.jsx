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
// --- Simplification After Moving State Back Down ---
//
// The enteredBody and enteredAuthor state slices previously lived here
// (lifted up from NewPost) so that a sibling Post could display live
// input values. Now that form submission collects the data inside
// NewPost itself, those state slices and their handler functions
// (bodyChangeHandler, authorChangeHandler) have moved back to NewPost.
//
// PostsList is now much leaner: it no longer imports useState, no
// longer defines change handlers, and no longer passes onBodyChange /
// onAuthorChange to NewPost. The only props it forwards to NewPost are
// onCancel (to close the modal). In a later lesson, PostsList will
// manage an array of submitted posts — but for now it just renders
// a static placeholder list.
function PostsList({ isPosting, onStopPosting }) {
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
          <NewPost onCancel={onStopPosting} />
        </Modal>
      )}
      {/* The posts below are static placeholders. In the next lesson,
          this list will be rendered dynamically from an array of post
          objects that grows as the user submits new posts. */}
      <ul className={classes.posts}>
        <Post author="Manuel" body="Check out the full course!" />
      </ul>
    </>
  );
}

export default PostsList;
