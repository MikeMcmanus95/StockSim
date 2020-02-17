import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPortfolioThunk } from '../store/stocks';
import { PortfolioTable } from './PortfolioTable';
import Purchase from './Purchase';

const Portfolio = ({ user, portfolio, getPortfolio }) => {
  useEffect(() => getPortfolio(user.id), []);

  return (
    <div className="portfolio">
      <PortfolioTable user={user} portfolio={portfolio} />
      <Purchase user={user} errorMsg={portfolio.errorMsg} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
