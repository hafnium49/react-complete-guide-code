// --- App.js: The Root Component ---
//
// This file defines the App component — the very first component in
// the application. It is imported and rendered by index.js, which
// mounts it into the root div on the page.
//
// A React component is, at its core, just a JavaScript FUNCTION. The
// function name starts with a capital letter (App, not app). This is
// a convention that matters for JSX: lowercase names are treated as
// built-in HTML elements, while uppercase names are treated as custom
// components.
//
// Inside the function, we return what looks like HTML but is actually
// JSX — a special syntax invented by the React team. JSX is NOT valid
// JavaScript on its own. The build tool (started by "npm start")
// transforms JSX into regular JavaScript function calls before the
// code reaches the browser. This is why the project setup is required
// for JSX to work.
//
// The return value describes the structure of the UI that this
// component should produce. React takes this description and creates
// the corresponding real DOM elements on the page.

function App() {
  return (
    <div>
      <h2>Let's get started!</h2>
    </div>
  );
}

// --- Export ---
//
// The component must be exported so other files can import and use it.
// "export default" means this is the main (and only) thing exported
// from this file. The importing file (index.js) can then choose any
// name for the import, though by convention the same name is used.
//
// This export/import mechanism is part of modern JavaScript (ES
// Modules). Whenever a function, class, or value is defined in one
// file and needed in another, it must be exported from the source
// file and imported in the consuming file.
export default App;
