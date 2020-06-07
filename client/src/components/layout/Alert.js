import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
const Alert = ({ alerts }) => {
  alerts !== null &&
    alerts.map((alert) =>
      toast.success(alert.msg, {
        position: toast.POSITION.TOP_CENTER,
      })
    );

  return (
    <ToastContainer
      position="top-center"
      transition={Zoom}
      autoClose={2500}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  );
};
Alert.propTypes = { alerts: PropTypes.array.isRequired };
const mapStateToProps = (state) => ({ alerts: state.alert });
export default connect(mapStateToProps)(Alert);
