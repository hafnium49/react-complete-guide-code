// --- Third-Party Libraries ---
//
// React's ecosystem includes thousands of open-source packages published
// on npm (Node Package Manager). You can install any of them into your
// project with "npm install <package-name>", which downloads the package
// into the node_modules/ folder and adds it to the "dependencies" list
// in package.json. After installation, you import from the package by
// name — just like you import from "react" — rather than using a
// relative file path.
//
// react-icons is one such library. It provides thousands of popular icon
// sets (Material Design, Font Awesome, Heroicons, etc.) as ready-to-use
// React components. Each icon is a component that renders an inline SVG,
// so it behaves just like any other React component — you can pass props
// to control size, color, and other attributes.
//
// The import below pulls two specific icons from the Material Design set
// (the "md" sub-path):
//   MdPostAdd  — an icon representing "add a new post"
//   MdMessage  — an icon representing a message/conversation
//
// Using named imports like this lets the bundler (Vite) include ONLY the
// icons you actually use, rather than the entire icon library.

// --- Prop Naming Convention for Function Props ---
//
// When a prop is expected to receive a function (typically an event
// handler), a common convention is to prefix the prop name with "on"
// (e.g., onCreatePost, onClose, onBodyChange). This signals to other
// developers that the prop expects a function — not a string or number —
// and that it will likely be connected to an event listener somewhere
// inside the component. The convention is not enforced by React; you
// could name the prop anything, but the "on" prefix is widely adopted
// because it mirrors React's built-in event props (onClick, onChange).

import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

// The onCreatePost prop receives a handler function from the parent
// (App). When the "New Post" button is clicked, this function runs,
// which sets the modal visibility state to true in App, causing the
// modal to appear. This is the same lifted-state pattern used elsewhere
// — the event happens here, the state lives in an ancestor, and a
// handler function bridges the two.
function MainHeader({ onCreatePost }) {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        {/* Icon components from react-icons are used inline just like
            any other React component. They render an SVG element. */}
        <MdMessage />
        React Poster
      </h1>
      <p>
        {/* The onClick prop connects the button's click event to the
            onCreatePost function passed in by the parent. Clicking this
            button will open the new-post modal. The size prop on
            MdPostAdd controls the icon's pixel dimensions. */}
        <button className={classes.button} onClick={onCreatePost}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;
