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
    console.log(`Submitting ${method}, ${email} and ${pass}`);
    props.login(method, email, pass);
    resetEmail();
    resetPass();
  };

  return (
    <div className="form">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="email" {...bindEmail} required />
        <input type="password" placeholder="password" {...bindPass} required />
        <button type="submit">login</button>
        <p className="message">
          Not registered? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    login: (method, email, password) => dispatch(auth(method, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
