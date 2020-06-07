import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
const Register = ({
  register,
  setAlert,
  auth: { isAuthenticated, loading },
}) => {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, password, password2, email } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password are not matched", "warning");
    } else {
      register({ username, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AZrica | Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="d-flex justify-content-center my-5 p-2">
        <form onSubmit={onSubmit} className="bg-light p-3 rounded">
          <div />
          <div className="form-group">
            <h2 className="text-center text-dark mb-4">
              <i className="fa fa-user fa-2x" /> <br />
              Sign up
            </h2>
          </div>
          <div className="form my-3">
            <div className="form-group">
              <input
                size="50"
                type="text"
                className="form-control "
                placeholder="Name..."
                name="username"
                value={username}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                size="50"
                type="email"
                className="form-control "
                placeholder="Email..."
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
                placeholder="Password..."
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                minLength="6"
                className="form-control"
                placeholder="Confirm password..."
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <button
                className="form-control btn btn btn-outline-dark"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </div>
          <Fragment>
            <p className="text-dark text-center text-muted mb-3 ">
              You have account ?{" "}
              <Link to="/login" className="text-dark">
                Sign in here{" "}
              </Link>
            </p>
          </Fragment>
        </form>
      </div>
    </div>
  );
};
Register.prototype = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapPropsToState = (state) => ({
  auth: state.auth,
});

export default connect(
  mapPropsToState,
  { register, setAlert }
)(Register);
