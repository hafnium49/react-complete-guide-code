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

function ExpenseItem() {
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
  return (
    <div className="expense-item">
      <div>March 28th 2021</div>
      <div className="expense-item__description">
        <h2>Car Insurance</h2>
        <div className="expense-item__price">$249.67</div>
      </div>
    </div>
  );
}

// The component must be exported so it can be imported and used in
// other files (in this case, App.js). Without this export, the
// function would only be accessible within this file.
export default ExpenseItem;
