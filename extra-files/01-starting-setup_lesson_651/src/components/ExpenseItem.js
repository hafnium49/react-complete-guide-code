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

function ExpenseItem() {
  return <h2>Expense item!</h2>;
}

// The component must be exported so it can be imported and used in
// other files (in this case, App.js). Without this export, the
// function would only be accessible within this file.
export default ExpenseItem;
