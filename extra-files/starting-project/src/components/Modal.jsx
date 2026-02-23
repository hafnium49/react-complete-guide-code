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

import classes from './Modal.module.css';

// Destructuring now extracts two props: children (the wrapped content)
// and onClose (a handler function passed by the parent). Destructuring
// multiple props at once makes the component's "API" easy to see at a
// glance — you know immediately which props this component expects.
function Modal({ children, onClose }) {
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

  // The Fragment (<>...</>) wraps the backdrop <div> and the <dialog>
  // because a component must return a single root element. The backdrop
  // sits behind the dialog to dim the rest of the page.
  return (
    <>
      {/* Clicking the backdrop should close the modal. The onClose
          function was passed in by the parent (PostsList) — it calls
          setModalIsVisible(false) to update PostsList's state. By
          attaching it to onClick here, we connect a user interaction
          in the child (Modal) to a state change in the parent. This
          is the same lifted-state pattern used elsewhere: the event
          happens in the child, the state lives in the parent, and a
          handler function bridges the two via props. */}
      <div className={classes.backdrop} onClick={onClose} />
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
