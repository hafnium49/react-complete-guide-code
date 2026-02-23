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
//   PostsList renders  <Post /> (multiple instances)
//
// Each level focuses on one responsibility:
//   - App is the root component (entry point of the component tree)
//   - PostsList manages the list layout
//   - Post renders a single item
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

import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {
  // The <ul> wraps the posts in a semantically correct list structure.
  // Each Post now renders as a <li> (list item) to match.
  // The classes.posts CSS Module class applies the grid layout styling.
  return (
    <ul className={classes.posts}>
      <Post author="Maximilian" body="React.js is awesome!" />
      <Post author="Manuel" body="Check out the full course!" />
    </ul>
  );
}

export default PostsList;
