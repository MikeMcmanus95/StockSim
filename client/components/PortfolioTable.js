import React from 'react';

export const PortfolioTable = ({ portfolio }) => {
  return (
    <div>
      <h1>Portfolio: ${portfolio.totalValue / 100}</h1>
      <table className="stocks-table">
        <tbody>
          {portfolio.stocksArr.map(stock => (
            <tr key={stock.symbol}>
              <td>
                {stock.symbol}
                {stock.changePercent[0] === '-' ? (
                  <div className="negative">{stock.changePercent}%</div>
                ) : (
                  <div className="positive">{stock.changePercent}%</div>
                )}
              </td>
              <td>{stock.quantity} Shares</td>
              <td>${stock.totalValue / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
