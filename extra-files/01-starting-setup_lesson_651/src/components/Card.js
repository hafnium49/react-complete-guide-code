// --- Card.js: A Reusable Wrapper Component (Composition) ---
//
// So far, every component we have built is "specific" — it renders
// one particular piece of the UI (an expense item, a date badge).
// Those components are configured entirely through props like title,
// amount, and date.
//
// But sometimes you need a component that acts as a generic SHELL
// around other content. It does not know or care what that content
// is — it simply wraps it in a container with some shared styling
// (rounded corners, a drop shadow, etc.). In web development, this
// kind of container is commonly called a "card."
//
// --- Composition ---
//
// Building a UI from smaller, nested building blocks is called
// composition. You do it every time you use one component inside
// another. A particularly useful form of composition is creating
// WRAPPER components like this Card. They let you extract shared
// container styles and HTML structure into one place, avoiding
// duplication across multiple components.
//
// --- props.children: The Key to Wrapper Components ---
//
// By default, content placed between the opening and closing tags
// of a CUSTOM component is NOT rendered. Built-in HTML elements
// (like <div>) render their children automatically, but custom
// components only render what their function explicitly returns.
//
// React solves this with a special, built-in prop called "children."
// You never set it as an attribute — React populates it
// automatically with whatever content sits between the component's
// opening and closing tags. To render that content, you simply
// output {props.children} in the returned JSX.
//
// For example, when you write:
//
//   <Card className="expense-item">
//     <ExpenseDate ... />
//     <div>...</div>
//   </Card>
//
// Everything between <Card> and </Card> becomes the value of
// props.children inside this Card function.
//
// --- Making className Extensible ---
//
// Built-in HTML elements support className out of the box — you
// set it and the CSS class is applied. Custom components, however,
// only support what YOU implement. If a parent sets className on
// <Card>, it arrives as props.className, but nothing happens unless
// we explicitly USE that value.
//
// The pattern here is to concatenate a base class ("card") with
// whatever extra classes the parent passes via props.className.
// This way, the Card always gets its own shared styles, PLUS any
// component-specific styles the parent needs.
import './Card.css';

function Card(props) {
  const classes = 'card ' + props.className;

  return <div className={classes}>{props.children}</div>;
}

export default Card;
