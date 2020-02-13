import React from 'react';
import { PortfolioTable } from './PortfolioTable';
import { Purchase } from './Purchase';
import { connect } from 'react-redux';
import { getStocksThunk } from '../store/stocks';

const Portfolio = ({ user, getStocks }) => {
  const handleClick = evt => {
    evt.preventDefault();
    getStocks('AAPL');
  };

  return (
    <div className="portfolio">
      <PortfolioTable user={user} />
      <Purchase user={user} handleClick={handleClick} />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getStocks(name) {
    dispatch(getStocksThunk(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
