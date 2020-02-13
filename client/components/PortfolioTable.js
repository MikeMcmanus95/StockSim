import React from 'react';

export const PortfolioTable = () => {
  return (
    <div>
      <h1>Portfolio ($7270)</h1>
      <table className="stocks-table">
        <tbody>
          <tr>
            <td>MSFT - 42 Shares</td>
            <td>$3125</td>
          </tr>
          <tr>
            <td>AAPL - 12 Shares</td>
            <td>$4145</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
