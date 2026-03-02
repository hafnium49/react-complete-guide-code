import React from 'react';

// --- ExpenseDate.js: Splitting Components ---
//
// As a React application grows, individual components tend to
// accumulate more and more logic and JSX. When a component starts
// doing too many things, it becomes harder to read, maintain, and
// reuse. The solution is to split it into smaller, focused
// components — each responsible for one piece of the UI.
//
// There is no hard rule for WHEN to split. It is a judgement call
// that comes with experience. Common signals that a split may help:
//   - The component has a distinct visual sub-section (like a
//     calendar date badge) with its own dedicated styles
//   - Several helper constants or formatting calls serve only one
//     part of the JSX — they can move into a child component
//   - The extracted piece could be reused elsewhere in the app
//
// In this case, the date-rendering logic (three formatting helpers
// and three nested divs) previously lived inside ExpenseItem. By
// extracting it into its own ExpenseDate component, we keep both
// components small and focused: ExpenseItem handles the overall
// expense row layout, while ExpenseDate handles only the calendar
// badge.
//
// --- Props Forwarding Through Multiple Levels ---
//
// Data in React flows downward through the component tree via
// props. The date value originates in the expenses array inside
// App.js. App passes it to ExpenseItem as a prop, and ExpenseItem
// then forwards it further into ExpenseDate — again via a prop.
//
// This means ExpenseItem acts as an intermediary: it receives the
// date from its parent and hands it on to its child. You cannot
// skip a level — if ExpenseDate needs the date and it lives inside
// ExpenseItem, the data must travel through ExpenseItem first.
// This pattern of prop forwarding is completely normal in React
// and you will encounter it frequently in any project.

// Import the companion CSS file to enable the calendar-badge
// styling. The class names used in the JSX below must match the
// selectors defined in this CSS file.
import './ExpenseDate.css';

// This component expects a single prop: "date" — a JavaScript
// Date object. It extracts the month, year, and day from that
// date and renders them in a small calendar-like layout.
function ExpenseDate(props) {
  // --- Extracting Logic into Helper Constants (Revisited) ---
  //
  // These three constants were originally defined inside the
  // ExpenseItem component. Moving them here keeps all date-related
  // logic co-located with the date-related JSX. The formatting
  // calls are identical to what we had before — only their home
  // has changed.
  const month = props.date.toLocaleString('en-US', { month: 'long' });
  const day = props.date.toLocaleString('en-US', { day: '2-digit' });
  const year = props.date.getFullYear();

  // The surrounding div with className "expense-date" creates the
  // calendar badge container. The three child divs each display
  // one part of the date, styled with BEM-style class names
  // (expense-date__month, expense-date__year, expense-date__day).
  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
