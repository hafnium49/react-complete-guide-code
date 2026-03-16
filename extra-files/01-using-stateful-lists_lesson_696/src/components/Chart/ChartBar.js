// --- Lesson 702: The ChartBar Component ---
//
// Each ChartBar is a single vertical bar in the chart. It receives
// three props from the parent Chart component:
//
//   - value:    the numeric amount this bar represents
//   - maxValue: the largest value across all bars in the chart
//   - label:    text displayed beneath the bar (e.g. "Jan")
//
// The bar's filled height is expressed as a percentage of maxValue.
// This means the tallest bar always fills 100% of the available
// height, and every other bar is proportional to it.
//
// --- Inline Styles in React ---
//
// The fill height is set via an inline style rather than a CSS
// class because the value is dynamic — it changes per bar and per
// render. In React, inline styles are passed as a JavaScript object
// (double curly braces in JSX: the outer pair opens a dynamic
// expression, the inner pair is the object literal). Property names
// use camelCase (e.g. "height" stays lowercase because it is a
// single word, but "backgroundColor" would be camelCase).
//
// --- Guard Against Division by Zero ---
//
// If maxValue is zero (all expenses are $0, or there are no
// expenses at all), dividing by it would produce Infinity or NaN.
// The if-check ensures we only compute the percentage when there
// is a meaningful maximum. Otherwise the bar stays at its default
// height of "0%".
import React from 'react';

import './ChartBar.css';

const ChartBar = (props) => {
  // Default to no fill. Overwritten below only if there is a
  // positive maximum to divide by.
  let barFillHeight = '0%';

  if (props.maxValue > 0) {
    // Round to avoid long decimal strings in the style attribute.
    // Concatenating '%' produces a valid CSS height value.
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
  }

  return (
    <div className='chart-bar'>
      {/* The outer container uses column flex to stack the bar
          and label vertically. */}
      <div className='chart-bar__inner'>
        {/* The fill div grows upward from the bottom (the parent
            uses justify-content: flex-end). Its height is set
            dynamically via the inline style. The CSS transition
            property on this class animates height changes. */}
        <div
          className='chart-bar__fill'
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className='chart-bar__label'>{props.label}</div>
    </div>
  );
};

export default ChartBar;
