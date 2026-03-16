// --- Lesson 702: Adding a Chart Component ---
//
// This component renders a bar chart by mapping an array of data
// points to individual ChartBar components. It is intentionally
// generic — it knows nothing about expenses or months. The parent
// that uses <Chart> decides how many data points to pass and what
// each one represents. This makes the component reusable: the same
// Chart could plot expenses per month, sales per quarter, or any
// other numeric series, as long as the data points conform to the
// expected shape.
//
// --- Expected data point shape ---
//
// Each element in the dataPoints array must be an object with at
// least two properties:
//
//   { value: <number>, label: <string> }
//
// "value" is the numeric amount to plot. "label" is a short text
// shown beneath the bar (e.g. "Jan", "Feb") and also serves as
// the key for React's list reconciliation. Because labels are
// expected to be unique across the chart, they double as a stable
// identifier — no separate id field is needed.
//
// --- Deriving the maximum value ---
//
// Each bar needs to know the overall maximum so it can express its
// own value as a percentage of the tallest bar. Rather than asking
// the parent to compute and pass this maximum, Chart derives it
// internally:
//
//   1. Map every data point to just its numeric value, producing
//      a plain number array.
//   2. Spread that array into Math.max() to find the largest value.
//
// This is another example of a derived (computed) value — the
// concept introduced in Lesson 693. totalMaximum is not stored
// in state because it can be recalculated from the data points
// on every render. Storing it in state would be redundant.
import React from 'react';

import ChartBar from './ChartBar';
import './Chart.css';

const Chart = (props) => {
  // Extract just the numeric values so Math.max can find the peak.
  // The spread operator (...) is required because Math.max expects
  // individual arguments, not an array.
  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    // The 'chart' class uses flexbox with justify-content:
    // space-around to distribute the bars evenly across the
    // available width, regardless of how many data points exist.
    <div className='chart'>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
