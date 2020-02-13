import React from 'react';
import { PortfolioTable } from './PortfolioTable';
import Purchase from './Purchase';
import { connect } from 'react-redux';

const Portfolio = ({ user, stocks }) => {
  return (
    <div className="portfolio">
      <PortfolioTable user={user} stocks={stocks} />
      <Purchase user={user} />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  stocks: state.stocks,
});

export default connect(mapStateToProps, null)(Portfolio);
