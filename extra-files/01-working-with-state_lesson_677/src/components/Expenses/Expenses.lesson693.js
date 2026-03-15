// --- Lesson 693: Derived / Computed State ---
//
// This lesson introduces a crucial best practice: when one value
// depends entirely on an existing piece of state, do NOT store it
// as a separate useState. Instead, compute it as a plain variable
// inside the component function.
//
// The instructor demonstrates this by adding a paragraph that lists
// the years currently NOT selected in the filter. For example, if
// 2020 is selected the text reads "Data for years 2019, 2021, and
// 2022 is hidden." The paragraph is a teaching device — the
// instructor removes it at the end of the lesson — but the concept
// it illustrates is fundamental.
//
// --- Why Not a Second useState? ---
//
// A naive implementation would declare a second state variable
// (filterInfoText) and update it inside the handler every time the
// filter changes. That works, but it is redundant: filterInfoText
// is entirely determined by filteredYear, so maintaining two
// synchronized states adds complexity without benefit. If you
// forget to update one when the other changes, they fall out of
// sync and the UI shows stale data.
//
// The rule of thumb: if a value can be calculated from existing
// state or props, compute it on the fly rather than storing it.
// Because the component function re-executes every time state
// changes, the computed variable will always reflect the latest
// state — no manual synchronization needed.

import React, { useState } from 'react';

import ExpenseItem from './ExpenseItem';
import ExpensesFilter from './ExpensesFilter';
import Card from '../UI/Card';
import './Expenses.css';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');

  // =====================================================================
  // ANTI-PATTERN (shown for educational purposes — do NOT use this):
  // =====================================================================
  //
  // const [filterInfoText, setFilterInfoText] = useState('2019, 2021, 2022');
  //
  // If we managed the info text as its own state, we would need to
  // update it manually inside the handler with an if/else-if chain:
  //
  //   const filterChangeHandler = (selectedYear) => {
  //     setFilteredYear(selectedYear);
  //     if (selectedYear === '2019') {
  //       setFilterInfoText('2020, 2021, 2022');
  //     } else if (selectedYear === '2020') {
  //       setFilterInfoText('2019, 2021, 2022');
  //     } else if (selectedYear === '2021') {
  //       setFilterInfoText('2019, 2020, 2022');
  //     } else {
  //       setFilterInfoText('2019, 2020, 2021');
  //     }
  //   };
  //
  // This approach has two problems:
  //   1. Redundancy — filterInfoText is fully determined by
  //      filteredYear, so a second state is unnecessary overhead.
  //   2. Fragility — every place that calls setFilteredYear must
  //      also remember to call setFilterInfoText, or the two will
  //      drift apart.
  // =====================================================================

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // --- The Correct Approach: A Computed Variable ---
  //
  // Because the component function runs again whenever filteredYear
  // changes, any plain variable declared here will be recalculated
  // automatically. There is no need for a setter or a separate
  // re-render trigger — the re-render already happens because of
  // setFilteredYear, and this code executes as part of that render.
  //
  // We start with a default value (for the '2020' case) and then
  // overwrite it if the selected year is different. The final value
  // of filterInfoText is always consistent with filteredYear by
  // construction — no synchronization logic required.
  let filterInfoText = '2019, 2021, 2022';

  if (filteredYear === '2019') {
    filterInfoText = '2020, 2021, 2022';
  } else if (filteredYear === '2021') {
    filterInfoText = '2019, 2020, 2022';
  } else if (filteredYear === '2022') {
    filterInfoText = '2019, 2020, 2021';
  }
  // Note: the '2020' case is handled by the default value above,
  // so it does not need its own branch. This is a small
  // simplification the instructor points out in the lesson.

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  // The <p> element displays the computed info text between the
  // filter dropdown and the expense list. It is unstyled because
  // the instructor treats it as a temporary demonstration — the
  // point is not the paragraph itself but the pattern behind it.
  //
  // Key takeaway: filterInfoText updates correctly every time the
  // dropdown changes, even though it is NOT managed with useState.
  // It works because changing filteredYear causes React to
  // re-execute this entire function, which recalculates
  // filterInfoText from the new filteredYear value.
  //
  // After demonstrating this concept, the instructor removes the
  // <p> element and the filterInfoText variable. The lesson's
  // purpose was to teach the derived-state pattern, not to add a
  // permanent UI feature.
  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <p>Data for years {filterInfoText} is hidden.</p>
      {filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </Card>
  );
}

export default Expenses;
