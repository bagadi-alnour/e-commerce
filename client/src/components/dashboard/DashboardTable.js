import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { getProducts, deleteProduct, productbyId } from "../../actions/product";
import { getUsers } from "../../actions/user";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
const DashboardTable = ({
  getProducts,
  productbyId,
  getUsers,
  deleteProduct,
  user: { users },
  product: { products },

  auth: { statistic, user, loading, isAuthenticated },
}) => {
  useEffect(() => {
    getProducts();
    getUsers();
  }, []);
  if (loading === true && isAuthenticated === false) {
    return <Spinner />;
  } else {
    return (
      <div className="p-0 m-0 bg-dark">
        <Helmet>
          <meta charSet="utf-8" />
          <title>AZrica | Dashboard</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="row bg-dark">
          <div className="col-md-2 bg-danger">
            <h3 className="text-dark my-2">
              <i className="fa fa-cog text-dark" />
              Dashbard
            </h3>
            <ul className="list-group text-dark">
              <li className="list-group-item bg-danger">
                Users
                {loading === false && (
                  <span className="badge  badge-pill text-dark p-1  float-right ">
                    {statistic.users}
                  </span>
                )}
              </li>
              <li className="list-group-item bg-danger text-dark">
                Products{" "}
                {loading === false && (
                  <span className="badge  badge-pill text-dark p-1 float-right ">
                    {statistic.prodcuts}
                  </span>
                )}
              </li>
              <li className="list-group-item bg-danger">
                Total Sales
                <span className="badge  badge-pill text-dark p-1 float-right ">
                  12,039,300 €
                </span>{" "}
              </li>
            </ul>
            <h4 className="my-3 text-dark">Products in Stockage</h4>
            <div className="progress my-2" style={{ height: "30px" }}>
              <div
                className="progress-bar bg-dark p-1"
                role="progressbar"
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                40% Stockage
              </div>
            </div>
          </div>
          <div className="col-md-10 p-0">
            <h4 className="text-dark bg-dark p-2">
              <small className="text-danger">
                {!loading && (
                  <span className="text-white h3 ">
                    {" "}
                    Welcome {user.username} |{" "}
                  </span>
                )}
                manage your website
              </small>
              <div className="dropdown float-right">
                <button
                  className="btn btn-lg btn-light bg-danger text-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Create/add
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Link className="dropdown-item" to="/new-product">
                    product
                  </Link>
                  <Link className="dropdown-item" to="/new-user">
                    User
                  </Link>
                  <Link className="dropdown-item" to="/new-admin">
                    Admin
                  </Link>
                </div>
              </div>
            </h4>
            <div id="accordion">
              <div className="card rounded-0 bg-dark">
                <div className="card-header" id="headingOne">
                  <h3 className="mb-0">
                    <button
                      className="btn btn-link text-danger"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      List of Products
                    </button>
                  </h3>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body bg-dark text-light">
                    <ul className="list-group bg-dark">
                      {loading === false &&
                        isAuthenticated === true &&
                        products.map((p) => (
                          <Fragment key={p._id}>
                            <li className="list-group-item bg-dark">
                              <span>
                                {p.name} - Quantity : {p.quantity} |
                                <small>
                                  {" "}
                                  <small className="text-danger">
                                    {p.price} €
                                  </small>{" "}
                                  {p.description.slice(0, 100)}
                                </small>
                              </span>
                              <button
                                onClick={(e) => deleteProduct(p._id)}
                                className="text-white btn float-right"
                              >
                                <i className="fa fa-trash text-danger " />
                              </button>
                              <button className="text-white btn float-right">
                                <Link to={`/edit-product/${p._id}`}>
                                  <i className="fa fa-edit text-warning" />
                                </Link>
                              </button>
                              <Link
                                to={`/product/${p._id}`}
                                onClick={(e) => {
                                  productbyId(p._id);
                                }}
                                className="text-white btn float-right"
                              >
                                <i className="fa fa-eye  text-success" />
                              </Link>
                            </li>
                          </Fragment>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card bg-dark text-light rounded-0">
                <div className="card-header" id="headingThree">
                  <h1 className="mb-0">
                    <button
                      className="btn btn-link collapsed  text-danger"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      List of users
                    </button>
                  </h1>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="card-body bg-dark text-light">
                    <ul className="list-group bg-dark">
                      <table className="table text-white">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                        {loading === true
                          ? users.map((user) => (
                              <Fragment key={user._id}>
                                <tbody>
                                  <tr>
                                    <td scope="row">{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                      {user.address ? (
                                        <Fragment>
                                          {user.address.address +
                                            " - " +
                                            user.address.city +
                                            ", " +
                                            user.address.code +
                                            " " +
                                            user.address.country}
                                        </Fragment>
                                      ) : (
                                        <p>There is no address info</p>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </Fragment>
                            ))
                          : null}
                      </table>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

DashboardTable.propTypes = {
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  productbyId: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
  user: state.user,
});
export default connect(
  mapStateToProps,
  { getProducts, deleteProduct, getUsers, productbyId }
)(withRouter(DashboardTable));
