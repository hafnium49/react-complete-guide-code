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

// A React component is a JavaScript function that returns JSX.
// JSX lets you write markup directly inside JavaScript, so the structure
// of the UI lives alongside the logic that drives it. React and the
// build tools (Vite, in this project) transform JSX into regular
// JavaScript that the browser can execute.
//
// If you inspect the served JavaScript in your browser's DevTools, you
// will not see the <h1> tag below — it will have been transformed into
// raw JavaScript function calls that produce the same DOM output.
function App() {
  return <h1>Hello World!</h1>;
}

export default App;
