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

// --- Using Custom Components in JSX ---
//
// To use a component defined in another file, you import it and then
// reference it in JSX as if it were an HTML element. The import path is
// relative and the file extension (.jsx) should be omitted.
//
// Behind the scenes, React executes the component function for you,
// takes the JSX it returns, and generates the appropriate browser
// instructions to render it on screen. You never call the function
// yourself with parentheses — you always use the <ComponentName /> syntax.

// PostsList is now the component that owns the list of Post instances.
// App no longer imports Post directly — that responsibility has moved
// into PostsList. This shows how component composition works in practice:
// the root component delegates to child components, which in turn
// delegate further down the tree.
import PostsList from './components/PostsList';

// --- Root Component ---
//
// In a typical React application there is one "root" component that is
// rendered in main.jsx. All other components are used inside (or nested
// within) this root component. Here, App is that root component.
//
// The App component does not sit in the components/ folder because it
// serves a special role as the top-level entry point of the component
// tree. Every other component is ultimately rendered because App (or one
// of its descendants) includes it in its JSX output.
function App() {
  // --- Reusing Components ---
  //
  // A component can be used as many times as you like. Each usage causes
  // React to execute the component function independently, so each
  // instance has its own execution context.
  //
  // Components you use only once (e.g., a site-wide navigation bar)
  // still benefit from being separate components, because they keep
  // related logic isolated in one place. PostsList is used only once
  // here, but it encapsulates the list layout and its child Post items,
  // keeping App focused on the overall page structure.

  // --- JSX Rule: Single Root Element ---
  //
  // A component's return statement must produce exactly ONE root JSX
  // element. Sibling elements cannot be returned side by side without a
  // wrapper. That wrapper can be any HTML element (here <main> is a good
  // semantic choice for page content). If no HTML element makes sense,
  // React also accepts empty tags (<>...</>) called a "Fragment" as a
  // wrapper that produces no extra DOM node.

  // --- Self-Closing Tags ---
  //
  // In JSX, every element must be explicitly closed. If an element has
  // no children (no content between opening and closing tags), you can
  // write it as a self-closing tag: <PostsList />. Writing it as a void
  // tag without the slash is NOT allowed and will cause an error. This
  // rule applies to both custom components and built-in HTML elements.
  return (
    <main>
      <PostsList />
    </main>
  );
}

// Exporting the component makes it available for import in other files.
// In main.jsx, "import App from './App'" brings this function in so it
// can be used as <App /> in JSX.
export default App;
