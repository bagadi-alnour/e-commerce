import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
const Navbar = ({ user, auth, logout }) => {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container">
        <Link to="/" className="navbar-brand text-dark">
          AZrica
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">
                About
              </Link>
            </li>
          </ul>
          <div className="navbar-right">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <span className="badge badge-white text-dark ">
                    {!user.loadding &&
                      user.cart.length !== 0 &&
                      user.cart.length}
                  </span>
                  <i className="fa fa-shopping-cart fa-lg text-dark" />
                </Link>
              </li>
              <li className="nav-item ">
                {auth.loading === false && auth.isAuthenticated === true ? (
                  <Fragment>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle text-dark bg-white"
                        type="button"
                        id="btnDropdownDemo"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {auth.user.username}
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="btnDropdownDemo"
                      >
                        <Link className="dropdown-item text-dark" to="/account">
                          Profile
                        </Link>

                        <button
                          onClick={logout}
                          className="dropdown-item text-dark "
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="dropdown">
                      <button
                        className="btn btn-white bg-white dropdown-toggle  nav-link text-dark"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Account
                      </button>
                      <div
                        className="dropdown-menu bg-dark p-0"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link
                          className="dropdown-item text-dark bg-white"
                          to="/login"
                        >
                          Sign in
                        </Link>
                        <Link
                          className="dropdown-item text-dark  bg-white"
                          to="/register"
                        >
                          Sing up
                        </Link>
                      </div>
                    </div>
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
Navbar.prototype = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapPropsToState = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(
  mapPropsToState,
  { logout }
)(Navbar);
