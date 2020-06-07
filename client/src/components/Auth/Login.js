import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { login } from "../../actions/auth";
const Login = ({ login, auth: { isAuthenticated, loading } }) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { password, email } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AZrica | Sign in</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="d-flex justify-content-center my-5 p-2 ">
        <form onSubmit={onSubmit} className="bg-light p-3 rounded">
          <div className="form-group">
            <h2 className="text-center mb-4">
              <i className="fa fa-user fa-2x" /> <br />
              Sign In
            </h2>
          </div>
          <div className="form my-3">
            <div className="form-group">
              <input
                size="50"
                type="email"
                className="form-control "
                placeholder="Email.."
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                minLength="6"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="form-control btn btn-outline-dark"
                placeholder="Login"
              >
                Login
              </button>
            </div>
          </div>
          <Fragment>
            <p className="text-dark text-center text-muted mb-4">
              You don't have account ?{" "}
              <Link to="/register" className="text-dark em">
                Sign up here{" "}
              </Link>
            </p>
          </Fragment>
        </form>
      </div>
    </div>
  );
};
Login.prototype = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  statistic: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
