import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { productbyId } from "../../../actions/product";
import { addProductToCart } from "../../../actions/user";
import Spinner from "../../layout/Spinner";
import { Helmet } from "react-helmet";
import { ToastContainer, toast, Zoom } from "react-toastify";

function ShowProduct({
  match,
  history,
  addProductToCart,
  product: { getProductById, loading },
  productbyId,
  auth,
}) {
  useEffect(
    () => {
      productbyId(match.params.id);
    },
    [loading]
  );
  if (loading === true) {
    return <Spinner />;
  } else {
    return (
      <div className="container my-4">
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>AZrica | {getProductById.name}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <button
          onClick={() => history.goBack()}
          className="border border-0 bg-white"
        >
          <i className="fa fa-arrow-left" /> Go back
        </button>
        {!auth.loading && (
          <Fragment>
            <div className="row p-0 m-0">
              <div className="col-12" />
              <div className="col-12">
                <h3 className="my-2">
                  {getProductById.name} {getProductById.weight}
                </h3>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 mt-2">
                {loading === false && getProductById.imageUrl && (
                  <div
                    id="carouselExampleIndicators"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    {}
                    <ol class="carousel-indicators">
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        class="active"
                      />
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="1"
                      />
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="2"
                      />
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          class="d-block img-fluid"
                          src={getProductById.imageUrl[0]}
                          alt="Third slide"
                          height="auto"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          class="d-block img-fluid"
                          src={getProductById.imageUrl[1]}
                          alt="Third slide"
                          height="auto"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          class="d-block img-fluid"
                          src={getProductById.imageUrl[2]}
                          alt="Third slide"
                          height="auto"
                        />
                      </div>
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="col-lg-5 col-md-5 col-sm-12">
                <div className="card-body text-dark">
                  <table className="table table-borderless">
                    <thead>
                      <tr className="bg-light">
                        <th scope="col">#</th>
                        <th scope="col">info</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Name</th>
                        <td>{getProductById.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Price</th>
                        <td>{getProductById.price} €</td>
                      </tr>
                      <tr>
                        <th scope="row">Weight</th>
                        <td>{getProductById.weight}</td>
                      </tr>
                      <tr>
                        <th scope="row">Description</th>
                        <td>{getProductById.description}</td>
                      </tr>
                      {auth.user.admin && (
                        <tr>
                          <th>Quantity</th>
                          <td>{getProductById.quantity}</td>
                        </tr>
                      )}
                      <tr>
                        <th className="pt-3" scope="row">
                          Action
                        </th>
                        <td>
                          <button
                            onClick={(e) => {
                              if (auth.isAuthenticated === false) {
                                toast.warn(
                                  "Please first login to add products to your cart"
                                );
                              }
                              e.preventDefault();

                              addProductToCart(getProductById._id);
                            }}
                            className="text-success btn"
                          >
                            <strong>Add to Card</strong>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
ShowProduct.propTypes = {
  productbyId: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  addProductToCart: PropTypes.func.isRequired,
};
const mapPropsToState = (state) => ({
  product: state.product,
  auth: state.auth,
});
export default connect(
  mapPropsToState,
  { productbyId, addProductToCart }
)(ShowProduct);
