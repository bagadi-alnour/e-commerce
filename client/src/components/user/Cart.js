import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import CartEmpty from "../img/cart.gif";
import { getCartProducts, deleteProductFromUserCart } from "../../actions/user";
import Spinner from "../layout/Spinner";
const Profile = ({
  auth,
  user,
  getCartProducts,
  deleteProductFromUserCart,
}) => {
  useEffect(() => {
    getCartProducts();
  }, []);
  const [productNumbertoBuy, setProductNumbertoBuy] = useState(1);
  let totalPurchase = [];

  return user.loading ? (
    <Spinner />
  ) : (
    <div className="container my-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AZrica | Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {user.cart.length == [] ? (
        <div className="container">
          <h5>
            <i className="fa fa-info-circle h1" /> Currently you don't have any
            product in your cart
          </h5>
          <img src={CartEmpty} alt="empty cart" />
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <Link className="text-dark h3 " to="/">
              <i className="fa fa-arrow-left" /> Go back
            </Link>
            <h2 className="mt-3">
              {!user.loading && "Welcome " + auth.user.username}
            </h2>
            {auth.user.address == undefined ? (
              <p>
                Shipping address not found{" "}
                <Link to="/account">Click here to add it</Link>{" "}
              </p>
            ) : (
              <p>
                {" "}
                <strong>
                  {" "}
                  <i className="fa fa-map-marked text-danger" /> Your shipping
                  addres{" "}
                </strong>{" "}
                :{" "}
                {auth.user.address.address +
                  " ," +
                  auth.user.address.city +
                  " " +
                  auth.user.address.code +
                  ", Tél : " +
                  auth.user.address.phone}{" "}
                <Link to="/account">Edit</Link>
              </p>
            )}
          </div>
          <div className="col-12" />
          {!auth.loaading &&
            user.cart.length > 0 &&
            user.cart.map((p, index) => (
              <Fragment key={p.name}>
                <div className="col-lg-4 col-md-6 col-sm-12 my-2 ">
                  <img
                    className="img-fluid rounded border"
                    src={p.imageUrl[0]}
                    alt="product"
                    height="auto"
                    width="350"
                  />
                </div>
                <div className="col-lg-8 col-md-6 col-sm-12 my-2 p-2 border rounded">
                  <span className="float-right text-danger">
                    {(p.price * productNumbertoBuy).toFixed(2)} €
                  </span>
                  <h3>{p.name} </h3>

                  <p>
                    {p.description} <br />
                    {p.category}
                  </p>
                  <p>
                    <span className="">
                      <button
                        onClick={() => {
                          deleteProductFromUserCart(p._id);
                          return <Redirect to="/cart" />;
                        }}
                        className="border border-0 bg-white text-danger"
                      >
                        Remove from Cart
                      </button>
                    </span>
                  </p>
                </div>
              </Fragment>
            ))}
        </div>
      )}
      {user.cart.length == [] ? null : (
        <strong className="float-right">
          Total : <span className="text-danger">391 €</span>
        </strong>
      )}
    </div>
  );
};

Profile.propTypes = {
  getCartProducts: PropTypes.func.isRequired,
  deleteProductFromUserCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { getCartProducts, deleteProductFromUserCart }
)(Profile);
