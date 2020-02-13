import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main } from './components/Main';
import { SignIn } from './components/SignIn';
import SignUp from './components/SignUp';

const Routes = props => {
  return (
    <>
      <Route exact path="/" component={Main} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </>
  );
};

export default Routes;
