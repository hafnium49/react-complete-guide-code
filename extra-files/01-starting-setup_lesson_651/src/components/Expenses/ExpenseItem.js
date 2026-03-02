import React from 'react';

// --- ExpenseItem.js: The First Custom Component ---
//
// This is the first component we create ourselves (App was provided
// by the starter project). It will eventually display a single
// expense entry — showing its date, title, and amount.
//
// --- File Organization ---
//
// Each component lives in its own file. A React project will have
// dozens or even hundreds of component files — that is completely
// normal. Grouping them inside a "components" folder keeps the src/
// directory organized. The root component (App.js) stays outside
// this folder because it has a special role: it is the only component
// rendered directly by index.js via createRoot().render(). Every
// other component is nested somewhere inside App.
//
// --- The Component Tree ---
//
// React applications form a tree structure of components. App sits
// at the top as the root. Below it are child components (like this
// ExpenseItem), which may themselves contain further children. Only
// the root component is mounted into the HTML page with the render()
// call in index.js. All other components are used as custom HTML
// elements inside the JSX of their parent components.
//
// --- Naming Convention ---
//
// Component file names use PascalCase (ExpenseItem, not expense-item
// or expenseItem). The function name inside the file matches the
// file name (without the extension). This is a convention, not a
// requirement, but following it makes imports predictable and keeps
// the codebase consistent.
//
// --- Why Uppercase Matters in JSX ---
//
// When React encounters a JSX tag, it applies a simple rule:
//   - Lowercase tags (div, h2, p) → built-in HTML elements
//   - Uppercase tags (ExpenseItem, App) → custom components
//
// If you used <expenseItem> (lowercase), React would look for a
// native HTML element called "expenseitem" — which doesn't exist —
// instead of executing your component function. The uppercase first
// letter is what tells React to treat the tag as a custom component.

// --- The Single Root Element Rule ---
//
// A JSX expression returned from a component must have exactly ONE
// root element. You cannot return sibling elements side by side:
//
//   return <div>A</div><div>B</div>;  // ERROR — two root elements
//
// This fails because JSX is transformed into function calls behind
// the scenes, and a function can only return ONE value. The simplest
// fix is to wrap everything in a single parent element (like a div):
//
//   return <div>  <div>A</div>  <div>B</div>  </div>;  // OK
//
// There are other workarounds (like React Fragments) that will be
// covered in a later lesson.
//
// --- Multi-Line JSX with Parentheses ---
//
// When JSX spans multiple lines, wrapping it in parentheses tells
// JavaScript that the return statement continues beyond the first
// line. Without parentheses, JavaScript's automatic semicolon
// insertion could treat the return as "return undefined;" before
// it ever sees the JSX on the next line.

// --- Importing a Sibling Component ---
//
// ExpenseDate is a child component that we extracted from this
// file to keep ExpenseItem focused. The import path uses "./"
// because both files live in the same components/ folder. When
// importing from the SAME directory, "./" means "look right here."
// (Contrast this with the import in App.js which uses
// "./components/ExpenseItem" because App.js lives one level up.)
import ExpenseDate from './ExpenseDate';

// Card is a wrapper component that provides shared container styles
// (rounded corners, drop shadow). By using <Card> instead of a plain
// <div> as the outermost element, we get those styles automatically
// without duplicating them in every component's CSS file.
//
// After file reorganization, Card lives in a sibling folder (../UI/).
// The ".." navigates up from Expenses/ to components/, then "/UI/Card"
// descends into the UI/ subfolder. ExpenseDate and ExpenseItem.css
// still use "./" because they are in the same Expenses/ directory.
import Card from '../UI/Card';

// --- Importing CSS for a Component ---
//
// To apply styles to a component, create a CSS file next to the
// component's JS file (same folder, matching name). Then import it
// with a bare import statement — no named import is needed because
// we are not importing a JavaScript value. The import simply tells
// the build process to include this CSS file in the final bundle
// and inject its styles into the page. Without this import, the
// build tool would not know the CSS file exists and the styles
// would not be applied.
//
// Convention: place the CSS file next to its component file with
// the same base name (ExpenseItem.js ↔ ExpenseItem.css). This
// keeps related files together and makes them easy to find.
import './ExpenseItem.css';

// --- Props: Receiving Data from the Parent ---
//
// In regular JavaScript, you make functions reusable by accepting
// parameters. React components work the same way, but with one
// important difference: regardless of how many attributes you set
// on the component tag, the function always receives exactly ONE
// parameter — an object conventionally named "props".
//
// React automatically collects ALL attributes set on the component
// tag (in this case, title, amount, and date set in App.js) and
// bundles them into this single props object as key-value pairs.
// The KEYS match the attribute names you chose in the parent, and
// the VALUES are whatever you passed.
//
// For example, if App.js has:
//   <ExpenseItem title="Car Insurance" amount={294.67} />
// then inside this function:
//   props.title  → "Car Insurance"
//   props.amount → 294.67
//
// The parameter name "props" is a convention, not a requirement.
// You could name it "data" or "attributes" — but "props" is the
// universally accepted name in the React community.
//
// With props, the component no longer stores its own data. It
// becomes a reusable template: the SAME component function renders
// different output depending on which props it receives. This is
// one of the most fundamental concepts in React.
//
// The three hardcoded constants (expenseDate, expenseTitle,
// expenseAmount) from the previous lesson are now gone — all data
// flows in through props from the parent component.
//
// --- Alternative: Object Destructuring in the Parameter List ---
//
// Instead of accepting the entire props object and then accessing
// its properties with dot notation (props.title, props.date, etc.),
// you can use JavaScript's object destructuring syntax directly in
// the function parameter list:
//
//   function ExpenseItem({ date, title, amount }) {
//     // Now use "date", "title", "amount" directly — no "props." prefix
//   }
//
// This pulls each named property out of the incoming props object
// and makes it available as a standalone variable. The curly braces
// here are NOT JSX or special React syntax — they are standard
// ES6 destructuring assignment, the same syntax you would use with
// any JavaScript function that receives an object parameter.
//
// Destructuring can make component code more concise because you
// avoid repeating "props." everywhere. It also makes it explicit
// at a glance which props the component expects. Many React
// projects prefer this style, so you will encounter it frequently.
//
// Both approaches — dot notation on the props object and parameter
// destructuring — are functionally identical. This course continues
// with the dot notation style for now.
function ExpenseItem(props) {
  // --- Dynamic Values in JSX with Curly Braces ---
  //
  // Single curly braces { } inside JSX open a "dynamic expression"
  // slot. Here we access properties on the props object to render
  // the data passed in by the parent. The VALUES of props are not
  // limited to dynamic expressions — you could also pass hardcoded
  // strings or numbers directly as attribute values. Props simply
  // carry data into the component; whether that data comes from a
  // variable or a literal is irrelevant to the mechanism.
  //
  // --- className Instead of class ---
  //
  // In standard HTML, you assign CSS classes with the "class"
  // attribute. In JSX, you must use "className" instead. This is
  // because JSX is ultimately JavaScript, and "class" is a reserved
  // keyword in JavaScript (used for defining ES6 classes). Using
  // "class" in JSX technically still works but will produce a
  // warning — always use "className" for correctness.
  //
  // The class names used here (expense-item, expense-item__description,
  // expense-item__price) match the selectors defined in the imported
  // ExpenseItem.css file. They follow the BEM naming convention
  // (Block__Element) which is a popular CSS methodology for keeping
  // class names organized and avoiding collisions.
  //
  // --- Using a Child Component (ExpenseDate) ---
  //
  // The date formatting logic and calendar-style JSX that were
  // previously in this function have been extracted into a separate
  // ExpenseDate component. This keeps ExpenseItem focused on the
  // overall expense row layout while ExpenseDate handles the
  // calendar badge rendering.
  //
  // We pass the date prop down to ExpenseDate via props. This is
  // prop forwarding: the date originated in App.js, was passed to
  // ExpenseItem, and is now forwarded one more level into
  // ExpenseDate. Data always flows downward through the component
  // tree, and you cannot skip intermediate components.
  //
  // --- Self-Closing Tags ---
  //
  // When a component has no content between its opening and closing
  // tags (no children), you can write it as a self-closing element:
  //
  //   <ExpenseDate date={props.date} />
  //
  // instead of:
  //
  //   <ExpenseDate date={props.date}></ExpenseDate>
  //
  // Both are functionally identical. The self-closing form is more
  // concise and is the common convention in React when there are
  // no children to pass.
  //
  // --- Card as the Root Element ---
  //
  // The outermost element is now <Card> instead of a plain <div>.
  // We pass "expense-item" as the className prop — Card appends it
  // to its own "card" class, so the rendered div ends up with both
  // "card" (shared styles) and "expense-item" (component-specific
  // styles). The border-radius and box-shadow that were previously
  // in ExpenseItem.css have been moved to Card.css to avoid
  // duplication, since Expenses uses the same visual treatment.
  //
  // The ExpenseDate and description elements sit between the
  // opening and closing <Card> tags, so they become the value of
  // props.children inside Card. Card renders them inside its div.
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </Card>
  );
}

// The component must be exported so it can be imported and used in
// other files (in this case, App.js). Without this export, the
// function would only be accessible within this file.
export default ExpenseItem;
