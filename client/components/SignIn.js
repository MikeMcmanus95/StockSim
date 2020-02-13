import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { auth } from '../store/user';
import { connect } from 'react-redux';

const SignIn = props => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: pass, bind: bindPass, reset: resetPass } = useInput('');
  const method = 'login';

  const handleSubmit = evt => {
    evt.preventDefault();
    props.login(method, email, pass);
    resetEmail();
    resetPass();
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <h1>Sign In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="email" {...bindEmail} required />
          <input
            type="password"
            placeholder="password"
            {...bindPass}
            required
          />
          <button type="submit">login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    login: (method, email, password) => dispatch(auth(method, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
