import React from 'react';

// --- Expenses.js: Grouping Related Items in a Container ---
//
// This component wraps all the individual ExpenseItem components
// into a single visual group. Previously, the four <ExpenseItem>
// elements lived directly inside App.js. Extracting them into a
// dedicated Expenses component has two benefits:
//
//   1. App.js stays lean — it only needs to pass the entire expenses
//      array once instead of wiring up each item individually.
//   2. Any styles or logic specific to the expense list (like the
//      dark background container) are encapsulated here rather than
//      cluttering the root component.
//
// --- Using Card as a Wrapper ---
//
// Instead of a plain <div>, we use the Card component as the
// outermost element. Card provides shared container styles (rounded
// corners, drop shadow) via its own CSS. We pass "expenses" as the
// className prop so that Card concatenates it with its base "card"
// class — giving us both the shared Card styles AND the
// Expenses-specific styles defined in Expenses.css.
//
// The four <ExpenseItem> elements between <Card> and </Card>
// become the value of props.children inside Card, which renders
// them inside its div. This is composition in action: Card provides
// the shell, Expenses provides the content.
//
// --- Receiving Data via Props ---
//
// App.js passes the entire expenses array as a single prop called
// "items." This component then distributes the individual fields
// (title, amount, date) to each ExpenseItem. The data flows
// downward: App → Expenses → ExpenseItem → ExpenseDate.
import ExpenseItem from './ExpenseItem';
// --- Relative Import After Reorganization ---
//
// Card.js now lives in a sibling folder (../UI/). The ".." means
// "go up one level" — out of the Expenses/ folder into components/
// — and then "/UI/Card" descends into the UI/ folder. The other
// imports (ExpenseItem, ExpenseDate, Expenses.css) still use "./"
// because they remain in the same Expenses/ folder as this file.
import Card from '../UI/Card';
import './Expenses.css';

function Expenses(props) {
  return (
    <Card className="expenses">
      <ExpenseItem
        title={props.items[0].title}
        amount={props.items[0].amount}
        date={props.items[0].date}
      />
      <ExpenseItem
        title={props.items[1].title}
        amount={props.items[1].amount}
        date={props.items[1].date}
      />
      <ExpenseItem
        title={props.items[2].title}
        amount={props.items[2].amount}
        date={props.items[2].date}
      />
      <ExpenseItem
        title={props.items[3].title}
        amount={props.items[3].amount}
        date={props.items[3].date}
      />
    </Card>
  );
}

export default Expenses;
