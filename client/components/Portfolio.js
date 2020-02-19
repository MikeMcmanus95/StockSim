import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPortfolioThunk, updatePortfolioThunk } from '../store/stocks';
import { PortfolioTable } from './PortfolioTable';
import Purchase from './Purchase';

const Portfolio = ({ user, portfolio, getPortfolio, updatePortfolio }) => {
  useEffect(() => {
    getPortfolio(user.id);
    const interval = setInterval(() => {
      updatePortfolio(portfolio);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="portfolio">
      <PortfolioTable user={user} portfolio={portfolio} />
      <Purchase user={user} errorMsg={portfolio.errorMsg || user.errorMsg} />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  portfolio: state.portfolio,
});

const mapDispatchToProps = dispatch => ({
  getPortfolio(userId) {
    dispatch(getPortfolioThunk(userId));
  },
  updatePortfolio(portfolio) {
    dispatch(updatePortfolioThunk(portfolio));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
