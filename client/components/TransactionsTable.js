import React from 'react';

export const TransactionsTable = ({ transactions }) => {
  // const date = new Date();
  // const dumbTransactions = [
  //   {
  //     id: 1,
  //     symbol: 'AAPL',
  //     quantity: 4,
  //     totalValue: 1000,
  //     date: date.toDateString(),
  //   },
  // ];
  const transactionsArr = transactions.transactionsArr;
  return (
    <div>
      <h1>Transaction History</h1>
      <table className="stocks-table">
        <tbody>
          {transactionsArr.map((stock, idx) => (
            <tr key={stock.id || idx}>
              <td>
                {stock.symbol} - {stock.quantity} Shares
              </td>
              <td>${stock.totalValue}</td>
              <td>{String(stock.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
