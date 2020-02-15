import React from 'react';

export const PortfolioTable = ({ stocks }) => {
  return (
    <div>
      <h1>Portfolio ($7270)</h1>
      <table className="stocks-table">
        <tbody>
          {stocks.stocksArr.map(stock => (
            <tr key={stock.symbol}>
              <td>
                {stock.symbol} -{' '}
                {stock.quantity || stock.portfolioStock.quantity} Shares
              </td>
              <td>
                $
                {stock.totalValue ||
                  stock.price * stock.portfolioStock.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
