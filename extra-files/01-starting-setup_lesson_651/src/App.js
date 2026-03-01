// --- App.js: The Root Component ---
//
// This file defines the App component — the very first component in
// the application. It is imported and rendered by index.js, which
// mounts it into the root div on the page. App is the "root" of the
// component tree — all other components are nested inside it (either
// directly or through intermediate parent components).
//
// App.js stays in the src/ folder rather than in src/components/
// because of this special role. It is the only component rendered
// via the createRoot().render() call in index.js.
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

// --- Importing a Custom Component ---
//
// To use a component defined in another file, you must import it.
// The path "./components/ExpenseItem" tells the build tool:
//   ./         → start in the same directory as this file (src/)
//   components → enter the components subfolder
//   /ExpenseItem → find ExpenseItem.js (the .js extension is omitted
//                  by convention for JavaScript imports)
//
// The imported name (ExpenseItem) is then available as a custom JSX
// tag. It must match exactly what you use in the JSX below.
import ExpenseItem from './components/ExpenseItem';

function App() {
  // --- Using a Custom Component in JSX ---
  //
  // Custom components are used just like built-in HTML elements.
  // Writing <ExpenseItem /> tells React to call the ExpenseItem
  // function and render whatever JSX it returns into this spot in
  // the DOM. The uppercase first letter is what distinguishes it
  // from a native HTML element.
  //
  // The three steps for using a custom component are always:
  //   1. Create it (define the function, return JSX)
  //   2. Export it (export default)
  //   3. Import it in the file where you want to use it
  return (
    <div>
      <h2>Let's get started!</h2>
      <ExpenseItem></ExpenseItem>
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
