import React from 'react';

export const Purchase = ({ user, handleClick }) => {
  return (
    <div>
      <h1>Cash - ${user.cashBal}</h1>
      <div className="buy-form">
        <form className="login-form" onSubmit={handleClick}>
          <input type="text" placeholder="ticker" />
          <input type="text" placeholder="quantity" />
          <button type="submit">Purchase</button>
        </form>
      </div>
    </div>
  );
};
