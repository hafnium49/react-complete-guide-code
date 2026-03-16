// --- Lesson 704: Adding the ExpensesChart ---
//
// This component bridges the generic Chart (which knows nothing
// about expenses) and the expense-specific data that lives in the
// Expenses component. It is a common React pattern to have a
// "connector" or "adapter" component that:
//
//   1. Receives domain-specific data (here: an array of expense
//      objects with date and amount fields).
//   2. Transforms it into the generic shape that a reusable
//      component expects (here: an array of { label, value }
//      data points).
//   3. Renders the reusable component with the transformed data.
//
// This keeps Chart fully reusable for any numeric data series
// while ExpensesChart handles the expense-to-chart translation.
//
// --- Aggregation Strategy ---
//
// We want one bar per month (12 total) showing the sum of all
// expenses in that month. The approach:
//
//   1. Start with 12 data point objects, one per month, each
//      initialized with value: 0.
//   2. Loop through the filtered expenses. For each expense,
//      use Date.getMonth() to find which month it belongs to.
//      getMonth() returns 0 for January through 11 for December,
//      which conveniently matches the array indices of our
//      12 data points.
//   3. Add the expense's amount to the corresponding data point's
//      value using +=.
//
// After the loop, every data point holds the total expenses for
// its month. This aggregated array is then passed to <Chart>.
//
// --- Why chartDataPoints is defined inside the function ---
//
// The array is created fresh on every render. This is intentional:
// if it were defined outside the component (like DUMMY_EXPENSES in
// App.js), the += operations would keep accumulating across renders,
// producing incorrect totals. A new array each time ensures we
// always start from zero and recompute from the current props.
import React from 'react';

import Chart from '../Chart/Chart';

const ExpensesChart = (props) => {
  // One data point per calendar month, all starting at zero.
  // The labels serve double duty: displayed beneath each bar
  // AND used as the key prop inside Chart's .map() call.
  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  // Aggregate expense amounts into the matching month bucket.
  // Note: this uses a for...of loop (iterates array values),
  // NOT for...in (which iterates object keys / array indices).
  // Using for...in on an array would give you index strings
  // ("0", "1", ...) instead of the expense objects themselves.
  for (const expense of props.expenses) {
    const expenseMonth = expense.date.getMonth(); // 0 = Jan, 11 = Dec
    chartDataPoints[expenseMonth].value += expense.amount;
  }

  // The Chart component will derive totalMaximum internally
  // (see Chart.js) and pass it to each ChartBar as maxValue.
  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpensesChart;
