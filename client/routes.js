import React, { useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Main } from './components/Main';
import { connect } from 'react-redux';
import { me } from './store/user';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const Routes = props => {
  useEffect(() => props.loadInitialData());
  const isLoggedIn = props.isLoggedIn;
  console.log('Am i logged in yet?', isLoggedIn);
  return (
    <>
      <Route exact path="/" component={Main} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
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
