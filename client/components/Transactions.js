import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TransactionsTable } from './TransactionsTable';
import { getHistoryThunk } from '../store/transactions';

export const Transactions = ({ transactions, getHistory }) => {
  useEffect(() => getHistory(), []);

  return (
    <div className="portfolio">
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

const mapStateToProps = state => ({
  transactions: state.transaction,
});

const mapDispatchToProps = dispatch => ({
  getHistory() {
    dispatch(getHistoryThunk());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
