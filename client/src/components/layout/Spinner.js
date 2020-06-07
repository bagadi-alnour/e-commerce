import React, { Fragment } from "react";
import gif from "../img/spinner.gif";
const Spinner = () => {
  return (
    <div className="container">
      <img
        style={{ margin: "auto", textAlign: "center", display: "block" }}
        src={gif}
        alt="Loading..."
      />
    </div>
  );
};
export default Spinner;
