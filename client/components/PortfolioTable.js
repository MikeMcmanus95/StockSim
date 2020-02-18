import React from 'react';

export const PortfolioTable = ({ portfolio }) => {
  return (
    <div>
      <h1>Portfolio (${portfolio.totalValue})</h1>
      <table className="stocks-table">
        <tbody>
          {portfolio.stocksArr.map(stock => (
            <tr key={stock.symbol}>
              <td>
                {stock.symbol} - {stock.quantity} Shares
              </td>
              <td>${stock.totalValue}</td>
              {stock.changePercent[0] === '-' ? (
                <td className="negative">{stock.changePercent}%</td>
              ) : (
                <td className="positive">{stock.changePercent}%</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
