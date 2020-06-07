import React, { Fragment } from "react";
import ProductList from "./products/ProductList";

function Landing(props) {
  return (
    <div className="container">
      <ProductList />
    </div>
  );
}

Landing.propTypes = {};

export default Landing;
