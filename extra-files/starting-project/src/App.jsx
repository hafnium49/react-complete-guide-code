// React is a popular JavaScript library for building modern, feature-rich,
// highly interactive user interfaces. This starting project serves as the
// foundation for a demo application that will be built step by step,
// covering all the core concepts needed to work with React.

// --- Imperative vs. Declarative ---
//
// Without React (vanilla JavaScript), you write IMPERATIVE code: step-by-step
// instructions telling the browser exactly what to do — create an element,
// configure it, attach an event listener, insert it into the DOM, etc.
// As the UI grows more interactive, this approach leads to increasingly
// verbose, harder-to-maintain code with more potential for errors.
//
// With React, you write DECLARATIVE code instead: you describe *what* the UI
// should look like (using JSX, which blends HTML-like syntax into JavaScript),
// and React figures out the step-by-step DOM instructions for you.
// This results in simpler, more readable code — especially for complex,
// interactive user interfaces.

// --- React Components ---
//
// React is all about components. A component is a function that returns
// JSX code — essentially HTML markup written inside JavaScript. Each
// component represents a reusable building block of the user interface
// (e.g., a header, a sidebar, a card, a form).
//
// You build complex UIs by combining and nesting components into each
// other, much like composing HTML elements. This granular approach makes
// even large interfaces manageable, because each piece is an isolated,
// self-contained function.
//
// Any function that returns JSX qualifies as a React component. Once
// defined, it can be used in other JSX code as if it were a custom HTML
// element (e.g., <App />). That is exactly what happens in main.jsx,
// where <App /> is passed to render().

// --- Using Custom Components in JSX ---
//
// To use a component defined in another file, you import it and then
// reference it in JSX as if it were an HTML element. The import path is
// relative and the file extension (.jsx) should be omitted.
//
// Behind the scenes, React executes the component function for you,
// takes the JSX it returns, and generates the appropriate browser
// instructions to render it on screen. You never call the function
// yourself with parentheses — you always use the <ComponentName /> syntax.
import Post from './components/Post';

// --- Root Component ---
//
// In a typical React application there is one "root" component that is
// rendered in main.jsx. All other components are used inside (or nested
// within) this root component. Here, App is that root component.
//
// The App component does not sit in the components/ folder because it
// serves a special role as the top-level entry point of the component
// tree. Every other component is ultimately rendered because App (or one
// of its descendants) includes it in its JSX output.
function App() {
  // Using <Post /> here tells React to execute the Post function, take
  // the JSX it returns (a <div> with two <p> tags), and render that
  // markup inside whatever App itself is rendered into.
  return <Post />;
}

// Exporting the component makes it available for import in other files.
// In main.jsx, "import App from './App'" brings this function in so it
// can be used as <App /> in JSX.
export default App;
