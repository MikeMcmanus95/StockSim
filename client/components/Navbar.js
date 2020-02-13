import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/user';

const Navbar = ({ handleLogout, isLoggedIn, userId }) => {
  return (
    <>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/home">Portfolio</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/">About</Link>
        </li>
      </ul>
    </>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  handleLogout() {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
