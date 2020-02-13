import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/useInput';

export const SignIn = props => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: pass, bind: bindPass, reset: resetPass } = useInput('');

  const handleSubmit = evt => {
    evt.preventDefault();
    alert(`Submitting ${email} and ${pass}`);
    resetEmail();
    resetPass();
  };

  return (
    <div className="form">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="username" {...bindEmail} required />
        <input type="password" placeholder="password" {...bindPass} required />
        <button type="submit">login</button>
        <p className="message">
          Not registered? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
};
