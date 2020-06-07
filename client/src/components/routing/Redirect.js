import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Direct = ({ auth }) => {
  return (
    !auth.loading &&
    (!auth.user.admin ? (
      <Fragment>
        <Redirect to="/" />
      </Fragment>
    ) : null)
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {}
)(Direct);
