// --- Creating a Custom Component ---
//
// A React component is a regular JavaScript function with two conventions:
//   1. Its name starts with an UPPERCASE character (e.g., Post, not post).
//      This is optional where you define the function, but required where
//      you use it in JSX. In JSX, lowercase names (div, p, h1…) are treated
//      as built-in HTML elements, while uppercase names (Post, App…) are
//      treated as custom components. If you used <post> instead of <Post>,
//      React would look for a native HTML element called "post" — which
//      doesn't exist — rather than executing your component function.
//   2. It returns JSX code — the HTML-like markup that describes what this
//      piece of the UI should look like.
//
// Component files are typically placed in a "components" folder inside src/.
// The folder name is a convention, not a requirement. The .jsx file extension
// IS required in Vite projects so the build tool knows the file contains JSX.
// (Create React App projects also accept plain .js for JSX files.)

// This Post component represents a single post (tweet-like item) in the
// demo application. It returns a <div> containing the author name and the
// post body. Later, multiple Post instances will be rendered to form a
// list/grid of posts.
function Post() {
  return (
    <div>
      <p>React.js</p>
      <p>React.js is awesome!</p>
    </div>
  );
}

// The component must be exported so other files can import and use it.
// Using "export default" means the importing file can choose any name for
// the import, though by convention the same name is used (Post).
export default Post;
