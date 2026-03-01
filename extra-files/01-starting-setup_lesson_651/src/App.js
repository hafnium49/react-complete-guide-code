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
//
// --- Declarative vs Imperative ---
//
// React follows a DECLARATIVE approach: you describe WHAT the UI
// should look like (the desired end state), and React figures out
// HOW to make the real DOM match that description.
//
// Without React, you would use an IMPERATIVE approach — writing
// step-by-step instructions to manipulate the DOM yourself:
//
//   const para = document.createElement('p');
//   para.textContent = 'This is also visible';
//   document.getElementById('root').appendChild(para);
//
// This works for simple pages, but becomes extremely cumbersome for
// complex UIs with dozens or hundreds of elements that appear,
// disappear, and change dynamically. With the declarative approach,
// you simply add a <p> element to the returned JSX below, and React
// generates all the necessary DOM instructions behind the scenes.
//
// --- Hot Reloading ---
//
// The development server watches your source files. When you save a
// change (like adding the paragraph below), it automatically picks
// up the modification and updates the page in the browser without
// a manual refresh. This tight feedback loop speeds up development.

function App() {
  return (
    <div>
      <h2>Let's get started!</h2>
      <p>This is also visible!</p>
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
