import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  // This handler stays tiny because the parent component owns the actual
  // filter state. This component only reports which option was selected.
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        {/* Binding the select to props.selected makes this a controlled input.
            The displayed option now always mirrors the state held in Expenses. */}
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
