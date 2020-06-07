import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShowMore from "react-show-more";
import { getProducts } from "../../../actions/product";
import { toast } from "react-toastify";

import { addProductToCart, getCartProducts } from "../../../actions/user";
const ProductComponent = ({
  products,
  addProductToCart,
  getCartProducts,
  getProducts,
  auth,
}) => {
  useEffect(() => {
    getCartProducts();
    getProducts();
  }, []);
  return (
    <Fragment>
      {products.map((prod) => (
        <Fragment key={prod._id}>
          {prod.quantity > 0 && (
            <div className="col-lg-3 col-md-4 col-sm-12 p-1">
              <Link className="product-link" to={`/product/${prod._id}`}>
                <div className="card-group">
                  <div className="card">
                    <img
                      src={
                        prod.imageUrl[0]
                          ? prod.imageUrl[0]
                          : "https://via.placeholder.com/150"
                      }
                      alt="product"
                      height="240"
                      className="card-img-top"
                    />
                    <div className="card-body product-card">
                      <p className="card-title text-danger">
                        {prod.name} - {prod.weight}
                      </p>
                      <p className="card-text text-dark">
                        <ShowMore
                          lines={2}
                          more="Show more"
                          less="Show less"
                          anchorClass=""
                        >
                          {prod.description}
                        </ShowMore>
                      </p>
                      <small className="text-dark">
                        Category :{" "}
                        <span className="text-muted">{prod.category}</span>
                        {prod.quantity < 10 && (
                          <span className="float-right text-danger">
                            {" "}
                            Only {prod.quantity} left{" "}
                          </span>
                        )}
                      </small>
                      <p className="card-text text-danger">
                        <strong className="btn text-danger">
                          {prod.price.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </strong>
                        <strong className="float-right">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (auth.isAuthenticated === false) {
                                toast.warn(
                                  "Please login first to add products to your cart"
                                );
                              } else {
                                addProductToCart(prod._id);
                              }
                            }}
                            className="text-success btn"
                          >
                            Add to Cart
                          </button>
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

ProductComponent.propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  getCartProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { addProductToCart, getCartProducts, getProducts }
)(ProductComponent);
