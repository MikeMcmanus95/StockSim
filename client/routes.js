import React, { useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { About } from './components/About';
import Portfolio from './components/Portfolio';
import { Transactions } from './components/Transactions';
import { connect } from 'react-redux';
import { me } from './store/user';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const Routes = ({ isLoggedIn, loadInitialData }) => {
  useEffect(() => loadInitialData(), []);

  return (
    <>
      <Route exact path="/" component={About} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      {isLoggedIn && (
        <>
          <Route path="/home" component={Portfolio} />
          <Route path="/transactions" component={Transactions} />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatchToProps = dispatch => ({
  loadInitialData() {
    dispatch(me());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
