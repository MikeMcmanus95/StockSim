import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStocksThunk } from '../store/stocks';
import { PortfolioTable } from './PortfolioTable';
import Purchase from './Purchase';

const Portfolio = ({ user, stocks, getStocks }) => {
  useEffect(() => getStocks(user.id), []);

  return (
    <div className="portfolio">
      <PortfolioTable user={user} stocks={stocks} />
      <Purchase user={user} errorMsg={stocks.errorMsg} />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  stocks: state.stocks,
});

const mapDispatchToProps = dispatch => ({
  getStocks(userId) {
    dispatch(getStocksThunk(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
