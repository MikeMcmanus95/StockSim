import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { connect } from 'react-redux';
import { auth } from '../store/user';

const SignUp = ({ signup, errorMsg }) => {
  const { value: name, bind: bindName, reset: resetName } = useInput('');
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: pass, bind: bindPass, reset: resetPass } = useInput('');
  const { value: confirm, bind: bindConfirm, reset: resetConfirm } = useInput(
    ''
  );

  const method = 'signup';
  const buttonDisabled = confirm !== pass || confirm === '';

  const handleSubmit = evt => {
    evt.preventDefault();
    signup(method, email, pass, name);
    resetEmail();
    resetName();
    resetPass();
    resetConfirm();
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <h1>Sign Up</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="name" {...bindName} />
          <input type="text" placeholder="email address" {...bindEmail} />
          <input type="password" placeholder="password" {...bindPass} />
          <input
            type="password"
            placeholder="re-enter password"
            {...bindConfirm}
          />
          <p className="message">
            Already registered? <Link to="/signin">Sign In</Link>
          </p>
          <button type="submit" disabled={buttonDisabled}>
            create
          </button>
        </form>
        {errorMsg ? <p className="message">{errorMsg}</p> : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  errorMsg: state.user.errorMsg,
});

const mapDispatchToProps = dispatch => {
  return {
    signup: (method, email, password, name) =>
      dispatch(auth(method, email, password, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
