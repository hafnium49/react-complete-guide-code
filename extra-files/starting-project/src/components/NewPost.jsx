// This component renders a form for creating a new post. It demonstrates
// that components can contain standard HTML form elements (textarea, input,
// label) alongside the React-specific conventions we've already seen.
//
// This form will eventually be used to add new posts to the list. For now,
// it is rendered above the posts list as a stepping stone — the next
// lessons will connect typing in this form to updating the displayed posts,
// which introduces the concept of "state".

import classes from './NewPost.module.css';

function NewPost() {
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
        <textarea id="body" required rows={3} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required />
      </p>
    </form>
  );
}

export default NewPost;
