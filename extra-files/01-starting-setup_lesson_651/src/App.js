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
// The path "./components/Expenses" tells the build tool:
//   ./         → start in the same directory as this file (src/)
//   components → enter the components subfolder
//   /Expenses  → find Expenses.js (the .js extension is omitted
//                by convention for JavaScript imports)
//
// Previously, App imported ExpenseItem directly and rendered four
// instances with individual props. That logic has now been extracted
// into a dedicated Expenses component. App only needs to pass the
// entire array once — Expenses handles distributing data to each
// ExpenseItem internally.
//
// This is another example of splitting components to keep each one
// focused: App manages the raw data, Expenses manages the list
// layout, ExpenseItem renders a single row, and ExpenseDate renders
// the calendar badge. The component tree now looks like:
//
//   App → Expenses → ExpenseItem → ExpenseDate
//                                → Card (wrapper)
//                 → Card (wrapper)
//
// --- What Actually Ends Up in the DOM ---
//
// If you inspect the page in the browser's developer tools (e.g.,
// Chrome DevTools → Elements tab), you will NOT see any <Card>,
// <ExpenseItem>, or <Expenses> elements. Only standard HTML
// elements (div, h2, etc.) appear in the real DOM. Custom
// components are a React-only abstraction: they exist in your
// source code to organize logic and UI, but every component
// ultimately resolves to built-in HTML elements. If you drill
// deep enough into any custom component, you will always find
// that it returns divs, spans, headings, or other native elements
// at the leaf level. React takes care of translating your
// component tree into actual DOM nodes.
import Expenses from './components/Expenses';

function App() {
  // --- Data Defined in the Parent Component ---
  //
  // The expense data lives here in App — the parent component —
  // rather than inside ExpenseItem. This is intentional: the
  // ExpenseItem component should be a reusable template that can
  // display ANY expense, not just one specific hardcoded expense.
  //
  // In a real application, this data would come from a database
  // or an API. For now, we define it as a local array of objects.
  // Each object represents one expense with an id, title, amount,
  // and date. The id field is not used yet but will be useful
  // later when rendering lists dynamically.
  //
  // --- This Application Is Still Static ---
  //
  // Notice that this array is defined once and never changes. There
  // is no way for the user to add, remove, or edit an expense. The
  // components are reusable and configurable through props, but the
  // DATA driving them is fixed. To make this app truly interactive
  // — so that user actions can change what is displayed — we need
  // a concept called STATE, which is the focus of the next section.
  // State lets a component re-render itself when its data changes.
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  // --- Passing the Entire Array as a Single Prop ---
  //
  // Instead of rendering four ExpenseItem components here and
  // wiring up each one's props individually, we now delegate that
  // to the Expenses component. We pass the entire expenses array
  // as a single prop called "items." Expenses then distributes the
  // individual fields (title, amount, date) to each ExpenseItem.
  //
  // This keeps App.js clean — it only needs one line of JSX to
  // render the whole expense list. The details of HOW items are
  // laid out live inside Expenses, where they belong.
  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses items={expenses} />
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

// --- Section Recap: React Basics & Working with Components ---
//
// The three core concepts covered in this section are:
//
//   1. JSX — The HTML-like syntax that React components return.
//      It is transformed into JavaScript function calls by the
//      build tool before the browser ever sees it.
//
//   2. Components — Reusable building blocks (JavaScript functions)
//      that return JSX. You combine them like custom HTML elements
//      to compose the overall user interface. Each component should
//      be small and focused on a single responsibility.
//
//   3. Props — The mechanism for passing data from a parent
//      component to a child component. Props make components
//      configurable and reusable: same code, different output.
//
// Additionally, we explored COMPOSITION — nesting components
// inside one another, including wrapper components that use
// props.children to act as generic shells around arbitrary content.
//
// Next up: JSX under the hood, file organization alternatives,
// and function syntax options — followed by the STATE concept
// that will make this application interactive.
