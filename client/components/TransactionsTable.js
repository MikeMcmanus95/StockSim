import React from 'react';

export const TransactionsTable = ({ transactions }) => {
  const transactionsArr = transactions.transactionsArr;
  return (
    <div>
      <h1>Transaction History</h1>
      <table className="stocks-table table-wide">
        <tbody>
          {transactionsArr.map((stock, idx) => (
            <tr key={idx}>
              <td>
                {stock.type} ({stock.symbol}) - {stock.quantity} Shares
              </td>
              <td>${stock.totalValue}</td>
              <td>{new Date(stock.date).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
