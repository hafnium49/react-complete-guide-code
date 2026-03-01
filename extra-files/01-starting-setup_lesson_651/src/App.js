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

  // --- Props: Passing Data to Child Components ---
  //
  // Props (short for "properties") are React's mechanism for passing
  // data from a PARENT component to a CHILD component. They work
  // like HTML attributes: you add custom attributes to the component
  // tag, and the child receives them as properties on an object.
  //
  // Here, each <ExpenseItem> receives three attributes:
  //   title  — the expense title (a string)
  //   amount — the expense amount (a number)
  //   date   — the expense date (a Date object)
  //
  // The NAMES of these attributes are entirely your choice. They
  // become the keys on the props object that the child component
  // receives. Whatever name you choose here (e.g., "title") must
  // match what you access in the child (e.g., props.title).
  //
  // The VALUES are set dynamically using curly braces to pull data
  // from the expenses array. For example, {expenses[0].title}
  // accesses the title property of the first object in the array.
  //
  // --- Reusing Components with Different Data ---
  //
  // This is the core power of props: we use the SAME component
  // (ExpenseItem) four times, but each instance receives DIFFERENT
  // data through its props. The component renders differently each
  // time based on the props it receives — same code, different
  // output. This is analogous to calling a function multiple times
  // with different arguments.
  //
  // --- Alternative: Passing a Single Object Prop ---
  //
  // Instead of setting three separate attributes (title, amount,
  // date) on each ExpenseItem, you could pass the entire expense
  // object as a single prop:
  //
  //   <ExpenseItem expense={expenses[0]} />
  //
  // The child component would then access nested properties like
  // props.expense.title, props.expense.date, etc. This pattern is
  // common when a component needs most or all fields from a data
  // object — it reduces the number of attributes you write in JSX
  // and keeps the parent code more concise.
  //
  // The trade-off is readability: individual props make it
  // immediately clear WHICH pieces of data the child expects,
  // whereas a single object prop hides that detail behind one
  // generic name. Both approaches are perfectly valid — the choice
  // depends on your preference and the use case. For clarity while
  // learning, this course continues with individual props.
  return (
    <div>
      <h2>Let's get started!</h2>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        date={expenses[3].date}
      ></ExpenseItem>
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
