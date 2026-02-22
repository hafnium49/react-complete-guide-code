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

// This is the App component — currently the only custom component in the
// project. It returns a single <h1> element, which is why "Hello World!"
// appears on screen. As the project grows, more components will be
// created and composed together inside (or alongside) this one.
//
// If you inspect the served JavaScript in your browser's DevTools, you
// will not see the <h1> tag below — it will have been transformed into
// raw JavaScript function calls that produce the same DOM output.
function App() {
  return <h1>Hello World!</h1>;
}

// Exporting the component makes it available for import in other files.
// In main.jsx, "import App from './App'" brings this function in so it
// can be used as <App /> in JSX.
export default App;
