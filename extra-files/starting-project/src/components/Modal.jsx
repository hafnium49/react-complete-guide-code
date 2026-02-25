// --- Wrapper Components and the children Prop ---
//
// Not every component represents a visible piece of UI like a button or a
// form field. Some components exist purely to WRAP other components — adding
// layout, styling, or behavior around whatever content is placed inside them.
// Modal is an example: it provides a backdrop overlay and a centered dialog
// box, but it does not know or care what content appears inside the dialog.
//
// To build a wrapper component you need a way to receive "the stuff between
// the opening and closing tags." React provides this through a special,
// reserved prop called children.

// --- The children Prop ---
//
// When you use a component with an opening AND closing tag and place content
// between them, React automatically collects that content and makes it
// available as props.children.
//
// Example usage in PostsList:
//   <Modal>
//     <NewPost ... />
//   </Modal>
//
// Here, <NewPost ... /> becomes the children of Modal. Inside Modal's
// function body, props.children (or just children after destructuring)
// holds that <NewPost ... /> element, and you can output it anywhere in
// your JSX with {children}.
//
// children is a RESERVED prop name — you do not define it in the parent's
// attribute list the way you would author="Manuel". React fills it in
// automatically based on the content nested between the tags. This is
// similar in spirit to how <div> in plain HTML can wrap any content.
//
// If you use a component with a SELF-CLOSING tag (<Modal />), children
// will be undefined because there is no content between tags.

// --- Object Destructuring for Props ---
//
// So far we have accessed props with dot notation: props.children,
// props.author, etc. JavaScript provides a shorthand called object
// destructuring that lets you extract specific properties directly in the
// function parameter list.
//
// Instead of:
//   function Modal(props) { ... props.children ... }
//
// You can write:
//   function Modal({ children }) { ... children ... }
//
// The curly braces in the parameter position are NOT JSX — they are
// standard JavaScript destructuring syntax. This pulls the children
// property out of the props object and assigns it to a local variable
// with the same name. You can destructure multiple props at once:
//   function Post({ author, body }) { ... }
//
// Both approaches (props.xyz vs destructuring) work identically at
// runtime. Destructuring is simply shorter and makes it immediately
// clear which props the component expects.

// --- useNavigate: Programmatic Navigation ---
//
// React Router provides two ways to navigate between routes:
//
//   1. DECLARATIVE — the Link component (renders an <a> element).
//      Used when navigation is triggered by clicking a visible link
//      or button in the UI.
//
//   2. PROGRAMMATIC — the useNavigate hook.
//      Used when navigation must happen as a SIDE EFFECT of some
//      action — e.g., after the user clicks a div (not a link),
//      after a form submission succeeds, after a timer expires, etc.
//      Anywhere you need to navigate from inside JavaScript code
//      rather than from a clickable link element.
//
// useNavigate is a HOOK provided by react-router-dom (not by React
// itself). React's hook system is extensible — third-party libraries
// can create and export their own hooks, and you can even build
// custom hooks yourself. All hooks follow the same rules: they must
// be called at the top level of a component function, not inside
// conditions, loops, or nested functions.
//
// Calling useNavigate() returns a FUNCTION (commonly stored in a
// variable called "navigate"). You invoke that function with a path
// string to trigger navigation:
//   navigate('/some-path')   — navigate to an absolute path
//   navigate('..')           — navigate to the PARENT route
//
// The ".." syntax works like the "cd .." command in a terminal: it
// moves up one level in the route hierarchy. This makes components
// more reusable because they do not need to know their absolute URL
// — they just say "go to my parent." If the route structure changes,
// the relative navigation still works correctly.
import { useNavigate } from 'react-router-dom';

import classes from './Modal.module.css';

// --- Self-Contained Navigation in Modal ---
//
// Previously, Modal received an onClose callback prop from its parent.
// The parent was responsible for deciding WHAT should happen when the
// backdrop was clicked (e.g., calling setModalIsVisible(false)).
//
// With routing, the modal's visibility is determined by the URL, not
// by a boolean state. Closing the modal means NAVIGATING AWAY from
// the current route (e.g., from /create-post back to /). Modal can
// now handle this internally using useNavigate — it no longer needs
// an onClose prop from the parent. This assumption works as long as
// Modal is always used as a wrapper inside a route component, and
// "closing" always means "go back to the parent route."
function Modal({ children }) {
  // --- The HTML <dialog> Element ---
  //
  // <dialog> is a built-in HTML element designed specifically for modal
  // and non-modal dialog boxes. Browsers give it built-in accessibility
  // features (focus trapping, Escape key handling) that you would
  // otherwise have to implement manually with a plain <div>.
  //
  // By default a <dialog> element is hidden. You can make it visible by
  // adding the open attribute. In JSX, boolean HTML attributes work the
  // same way as in HTML — you can write just the attribute name without
  // a value:
  //   <dialog open>          — equivalent to open={true}
  //   <dialog open={true}>   — explicit form, identical result
  //   <dialog>               — omitting the attribute means hidden
  //
  // Writing a prop name without an explicit value is a JSX shorthand for
  // passing true. This shorthand works for any boolean prop, not just
  // built-in HTML attributes.

  // Call the hook at the top level to obtain the navigate function.
  // This function can then be used anywhere inside the component —
  // in event handlers, effects, or other callbacks.
  const navigate = useNavigate();

  // This handler will be attached to the backdrop div's onClick.
  // Instead of calling a parent-provided callback, it uses the
  // navigate function to move to the parent route (".."). The user
  // sees the modal disappear because React Router unmounts this
  // route's element and renders the parent route's content instead.
  function closeHandler() {
    navigate('..');
  }

  // The Fragment (<>...</>) wraps the backdrop <div> and the <dialog>
  // because a component must return a single root element. The backdrop
  // sits behind the dialog to dim the rest of the page.
  return (
    <>
      {/* Clicking the backdrop triggers closeHandler, which navigates
          to the parent route. This replaces the old onClose prop
          pattern with router-based navigation. */}
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {/* Render whatever content was placed between <Modal> and
            </Modal> in the parent component. This is the power of
            the children prop — Modal does not need to know what it
            wraps. It could be a form, a confirmation message, or
            anything else. */}
        {children}
      </dialog>
    </>
  );
}

export default Modal;
