import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { productbyId } from "../../../actions/product";
function BuyProudct({ match, product: { getProductById, loading } }) {
  useEffect(
    () => {
      productbyId(match.params.id);
    },
    [loading]
    /**
    test staff here
    
    */
  );
  return (
    <div className="container">
      <h1>Buy Product</h1>
    </div>
  );
}

BuyProudct.propTypes = {
  productbyId: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
});
export default connect(
  mapStateToProps,
  { productbyId }
)(BuyProudct);
