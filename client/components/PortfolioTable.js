import React from 'react';

export const PortfolioTable = ({ stocks }) => {
  return (
    <div>
      <h1>Portfolio ($7270)</h1>
      <table className="stocks-table">
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.symbol}>
              <td>
                {stock.symbol} - {stock.quantity} Shares
              </td>
              <td>${stock.totalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
