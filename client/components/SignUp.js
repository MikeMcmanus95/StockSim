import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { connect } from 'react-redux';
import { auth } from '../store/user';

const SignUp = props => {
  const { value: name, bind: bindName, reset: resetName } = useInput('');
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: pass, bind: bindPass, reset: resetPass } = useInput('');
  const { value: confirm, bind: bindConfirm, reset: resetConfirm } = useInput(
    ''
  );

  const handleSubmit = evt => {
    evt.preventDefault();
    alert(`Submitting ${email}, ${name} and ${pass}`);
    props.signup(email, name, pass);
    resetEmail();
    resetName();
    resetPass();
    resetConfirm();
  };
  return (
    <div className="form">
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="name" {...bindName} />
        <input type="text" placeholder="email address" {...bindEmail} />
        <input type="password" placeholder="password" {...bindPass} />
        <input
          type="password"
          placeholder="re-enter password"
          {...bindConfirm}
        />

        <button type="submit">create</button>
        <p className="message">
          Already registered? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (email, name, password) => dispatch(auth(email, name, password)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
