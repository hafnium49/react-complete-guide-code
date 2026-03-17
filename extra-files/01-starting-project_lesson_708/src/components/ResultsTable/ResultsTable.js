/*
  TUTOR'S GUIDANCE:
  "Formatting Utility"
  We utilize the native JavaScript Intl API here to properly format our numbers into
  strict USD strings, complete with dollar signs and enforced 2-decimal trailing commas!
*/
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ResultsTable = (props) => {
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {/*
          TUTOR'S GUIDANCE:
          "Mapping States to Components"
          Because `props.data` is an array of objects passed down from App.js, 
          we map through it. React demands a unique `key` on mapped JSX arrays so it efficiently 
          knows exactly which elements need to update behind the scenes under the Virtual DOM!
        */}
        {props.data.map((yearData) => {
          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.savingsEndOfYear)}</td>
              <td>{formatter.format(yearData.yearlyInterest)}</td>
              <td>
                {/* 
                  TUTOR'S GUIDANCE:
                  Total interest gained over the lifetime of the portfolio so far equals our 
                  total savings *minus* our initial deposit *minus* all accumulated yearly deposits.
                */}
                {formatter.format(
                  yearData.savingsEndOfYear -
                    props.initialInvestment -
                    yearData.yearlyContribution * yearData.year
                )}
              </td>
              <td>
                {/* 
                  TUTOR'S GUIDANCE:
                  Our raw invested baseline without interest returns equals our baseline initial deposit 
                  *plus* all consecutive yearly deposits over the respective lifetime up to this year.
                */}
                {formatter.format(
                  props.initialInvestment +
                    yearData.yearlyContribution * yearData.year
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResultsTable;
