// --- PostsList: Data from Route Loader ---
//
// This component has been dramatically simplified. Previously it was
// responsible for:
//   - Managing posts state with useState
//   - Managing loading state (isFetching) with useState
//   - Fetching data from the backend with useEffect
//   - Three-way conditional rendering (loading / posts / empty)
//
// All of that is now handled by React Router's loader feature:
//   - The loader function in Posts.jsx fetches data BEFORE the component
//     renders, so there is no "loading" state to manage.
//   - The fetched posts are accessed via the useLoaderData hook, so
//     there is no posts state to manage with useState.
//   - The isFetching boolean is gone entirely — when PostsList renders,
//     the data is always already available.
//
// The result is a component that only does TWO things: read the data
// from the loader, and render it. This is a major reduction in
// complexity and code.

// --- Naming Conventions ---
//
// It is good practice to put each component in its own file. File names
// should describe the component's purpose and use PascalCase (also known
// as upper camel case) — each sub-word starts with a capital letter
// (e.g., PostsList, not posts-list or postslist).
// The same convention applies to the function name inside the file.

// --- useLoaderData ---
//
// This hook is provided by react-router-dom. When called inside a
// component, it returns whatever value the active route's loader
// function returned. In this case, the Posts route's loader returns
// an array of post objects, so useLoaderData() gives us that array.
//
// useLoaderData can be called in the route's element component (Posts)
// OR in any component nested inside it (like PostsList here). React
// Router walks up the route hierarchy to find the nearest loader and
// returns its data. This means PostsList does not need to receive
// posts as a prop — it can access the loader data directly.
//
// Like all hooks, useLoaderData must be called at the top level of a
// component function, not inside conditions or loops.
import { useLoaderData } from 'react-router-dom';

import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {
  // --- Accessing Loader Data ---
  //
  // This single line replaces:
  //   const [posts, setPosts] = useState([]);
  //   const [isFetching, setIsFetching] = useState(false);
  //   useEffect(() => { ... fetch logic ... }, []);
  //
  // The posts variable now holds the array returned by the loader in
  // Posts.jsx. Because the loader completes before this component
  // renders, posts is NEVER undefined or empty due to "still loading."
  // If the backend returns an empty array, it genuinely means there
  // are no posts — not that the request is in flight.
  const posts = useLoaderData();

  return (
    <>
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
      {/* --- Simplified Conditional Rendering ---

          With the loader handling data fetching, the three-way
          conditional (loading / posts / empty) has been reduced to a
          two-way conditional (posts / empty). There is no "loading"
          state because the loader finishes BEFORE this component
          renders. React Router itself handles the loading phase — it
          simply delays rendering until the data is ready.

          For slow backends, React Router provides advanced features
          like deferred data and loading UI, but those are beyond the
          scope of this crash course. */}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {/* --- Empty-State Fallback ---

          This fallback appears when the posts array is genuinely empty
          (the backend returned no posts). Unlike before, there is no
          isFetching guard needed — the loader ensures this component
          only renders after data has arrived.

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
