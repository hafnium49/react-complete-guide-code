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

// --- Lifting State Up (Again) ---
//
// Previously, the modalIsVisible state lived in PostsList. But now a
// NEW sibling component — MainHeader — also needs to interact with
// that state (its button should open the modal). Since state can only
// flow downward through props, the state must live in the nearest
// common ancestor of both MainHeader and PostsList. That ancestor is
// App. Moving state to a higher component to satisfy this requirement
// is the "lifting state up" pattern applied once more.
//
// After lifting:
//   - App owns modalIsVisible and its two handlers (show / hide).
//   - App passes a boolean (isPosting) down to PostsList so it knows
//     whether to render the modal.
//   - App passes the hide handler (onStopPosting) to PostsList, which
//     forwards it to Modal's onClose prop.
//   - App passes the show handler (onCreatePost) to MainHeader, which
//     attaches it to the button's onClick event.
//
// This means state values and handler functions can travel through
// multiple levels of components. The flow may look complex at first,
// but each step is just "pass a value via a prop."
import { useState } from 'react';

import PostsList from './components/PostsList';
import MainHeader from './components/MainHeader';

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
//
// --- App as a Route Element ---
//
// With client-side routing now configured in main.jsx, App is no longer
// rendered directly by createRoot(). Instead, it is the ELEMENT for the
// "/" route — React Router renders it only when the browser URL matches
// "/". Navigating to a different path (e.g., "/create-post") causes
// React Router to render a DIFFERENT component entirely, and App
// disappears from the screen.
//
// This means that the header, the post list, and the modal form all
// vanish when the user navigates away from "/". Ideally, shared UI
// like MainHeader should persist across all routes. That problem will
// be solved with "layout routes," which allow a parent route to render
// wrapper UI (header, navigation) that stays on screen while child
// routes swap in and out below it.
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

  // The modal visibility state now lives here in App (lifted up from
  // PostsList) so that both MainHeader and PostsList can interact with
  // it. The default is false — the modal starts hidden, and the user
  // must click the "New Post" button to open it.
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Two handlers — one to show, one to hide — give us full control
  // over the modal. Each will be passed to a different child component:
  // showModalHandler goes to MainHeader (button click opens the modal),
  // hideModalHandler goes to PostsList (backdrop click closes it).
  function showModalHandler() {
    setModalIsVisible(true);
  }

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  // --- Passing State and Handlers Across Multiple Levels ---
  //
  // The component tree now looks like:
  //   App  →  MainHeader   (receives showModalHandler via onCreatePost)
  //   App  →  PostsList    (receives modalIsVisible via isPosting,
  //                          and hideModalHandler via onStopPosting)
  //        →  PostsList → Modal  (receives onStopPosting as onClose)
  //
  // The state value and its updaters flow DOWNWARD through props at
  // each level. This is React's one-directional data flow in action:
  // a parent decides what data each child gets, and children
  // communicate back up by calling the handler functions they received.
  //
  // The prop name isPosting (rather than modalIsVisible) is chosen to
  // describe meaning from PostsList's perspective: "am I currently in
  // the process of creating a post?" Prop names do not have to match
  // the state variable name — pick whatever communicates intent best.
  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        <PostsList isPosting={modalIsVisible} onStopPosting={hideModalHandler} />
      </main>
    </>
  );
}

// Exporting the component makes it available for import in other files.
// In main.jsx, "import App from './App'" brings this function in so it
// can be used as <App /> in JSX.
export default App;
