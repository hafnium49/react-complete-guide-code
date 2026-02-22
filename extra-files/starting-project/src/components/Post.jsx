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

// Data defined outside the component function is created once and shared
// across all renders. This array holds two possible author names.
const names = ['Maximilian', 'Manuel'];

// This Post component represents a single post (tweet-like item) in the
// demo application.
//
// A component function is still a regular JavaScript function — you can
// run any standard JavaScript code inside it (variables, calculations,
// API calls, etc.) before the return statement. The only requirement is
// that the function ultimately returns JSX.
function Post() {
  // Standard JavaScript logic inside a component: Math.random() is a
  // built-in browser API, not a React feature. Every time React renders
  // this component (e.g., on page reload), the function executes again
  // and a new random name is picked.
  const chosenName = Math.random() > 0.5 ? names[0] : names[1];

  // --- Dynamic values in JSX with curly braces ---
  //
  // Wrapping a JavaScript expression in single curly braces { } inside
  // JSX tells React to evaluate that expression and output its result.
  // Without curly braces, text is rendered literally (e.g., "chosenName"
  // would appear as the string "chosenName"). With curly braces, React
  // looks up the variable and inserts its current value instead.
  //
  // You can place any valid JavaScript expression inside the braces:
  // variables, constants, arithmetic ({2 + 2} renders "4"), function
  // calls, ternary operators, etc. This is how you make React UIs
  // dynamic — whether displaying random values, computed results, or
  // data fetched from a backend API.
  return (
    <div>
      <p>{chosenName}</p>
      <p>React.js is awesome!</p>
    </div>
  );
}

// The component must be exported so other files can import and use it.
// Using "export default" means the importing file can choose any name for
// the import, though by convention the same name is used (Post).
export default Post;
