import React from 'react';
import { connect } from 'react-redux';
import useInput from '../hooks/useInput';
import { addStockThunk } from '../store/stocks';

const Purchase = ({ user, addStock, errorMsg }) => {
  const { value: ticker, bind: bindTicker, reset: resetTicker } = useInput('');
  const { value: qty, bind: bindQty, reset: resetQty } = useInput('');

  const handleClick = evt => {
    evt.preventDefault();
    addStock(ticker, qty);
    resetTicker();
    resetQty();
  };

  return (
    <div>
      <h1>Cash: ${user.cashBal / 100}</h1>
      <div className="buy-form">
        <form className="login-form" onSubmit={handleClick}>
          <input type="text" placeholder="ticker" {...bindTicker} />
          <input type="text" placeholder="quantity" {...bindQty} />
          <button type="submit">Purchase</button>
        </form>
      </div>
      {errorMsg ? <p className="message">{errorMsg}</p> : null}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addStock(name, qty) {
    dispatch(addStockThunk(name, qty));
  },
});

export default connect(null, mapDispatchToProps)(Purchase);
