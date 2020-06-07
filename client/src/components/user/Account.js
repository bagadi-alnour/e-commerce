import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import Snipper from "../layout/Spinner";
import { updateUserProfile } from "../../actions/auth";
import Spinner from "../layout/Spinner";
import { Helmet } from "react-helmet";
const Account = ({ updateUserProfile, auth }) => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
    phone: "",
    code: "",
    email: "",
  });
  const { country, state, city, address, phone, code } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      email: auth.user.email,
    });
  };

  useEffect(
    () => {
      if (auth.user.address !== undefined) {
        setFormData({
          country: auth.user.address.country,
          city: auth.user.address.city,
          state: auth.user.address.state,
          code: auth.user.address.code,
          address: auth.user.address.address,
          phone: auth.user.address.phone,
        });
      }
    },
    [auth.loading]
  );

  return (
    <div className="row">
      {auth.loading ? (
        <Snipper />
      ) : (
        <div className="container">
          <Helmet>
            <meta charSet="utf-8" />
            <title>AZrica | My Account</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <div className="row">
            <div className="col-12">
              <h1 className="my-3">
                {" "}
                Welcome {!auth.loading && auth.user.username}
              </h1>
            </div>
            <div className="colg-lg-4 col-md-4 col-sm-12">
              <div className="card">
                <div className="card-body w-100 p-3">
                  <h5 className="card-title"> Delivery Adress :</h5>
                  <h6 className="card-subtitle my-2 text-muted" />
                  <table className="table table-responsive ">
                    <tbody>
                      <tr>
                        <th scope="row">Email </th>
                        <td>{auth.user.email}</td>
                      </tr>

                      {auth.user.address && (
                        <Fragment>
                          <tr>
                            <th scope="row">Country</th>
                            <td>{auth.user.address.country}</td>
                          </tr>
                          <tr>
                            <th scope="row">State</th>
                            <td>{auth.user.address.state}</td>
                          </tr>
                          <tr>
                            <th scope="row">City</th>
                            <td>{auth.user.address.city}</td>
                          </tr>
                          <tr>
                            <th scope="row">Code zip</th>
                            <td>{auth.user.address.code}</td>
                          </tr>
                          <tr>
                            <th scope="row">Address</th>
                            <td>{auth.user.address.address}</td>
                          </tr>
                          <tr>
                            <th scope="row">Phone number</th>
                            <td>{auth.user.address.phone}</td>
                          </tr>
                        </Fragment>
                      )}

                      <tr>
                        <td colspan="2">
                          <div className="collapse" id="accoutUpdateForm">
                            <form
                              className="bg-white"
                              onSubmit={(e) => {
                                e.preventDefault();
                                updateUserProfile(formData);
                                if (auth.loading === false) {
                                  return window.location.reload();
                                } else {
                                  return <Spinner />;
                                }
                              }}
                            >
                              <div className="form-group">
                                <label for="country">Country</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="country"
                                  name="country"
                                  value={country}
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <div className="form-group">
                                <label for="state">state</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="state"
                                  name="state"
                                  value={state}
                                  required
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <div className="form-group">
                                <label for="city">City</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="city"
                                  name="city"
                                  value={city}
                                  required
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <div className="form-group">
                                <label for="code">Code</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="code"
                                  name="code"
                                  value={code}
                                  required
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <div className="form-group">
                                <label for="code">Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="address"
                                  name="address"
                                  value={address}
                                  required
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                              <div className="form-group">
                                <label for="number">Phone</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="phone"
                                  name="phone"
                                  value={phone}
                                  required
                                  onChange={(e) => onChange(e)}
                                />
                              </div>

                              <div className="form-group">
                                <input
                                  type="submit"
                                  className="btn  btn-success"
                                  value="Update"
                                />
                              </div>
                            </form>
                          </div>
                          <p>
                            <a
                              className="btn btn-dark"
                              data-toggle="collapse"
                              href="#accoutUpdateForm"
                              role="button"
                              aria-expanded="false"
                              aria-controls="accoutUpdateForm"
                            >
                              {auth.user.address === undefined
                                ? "Add "
                                : "Edit"}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-8 col-sm-12">
              {!auth.loading === false && auth.user.purchase.length > 0 ? (
                <table className="table table-striped">
                  <h3>History of my purchases</h3>
                  <thead>
                    <tr>
                      <th scope="col">Product </th>
                      <th scope="col">price</th>
                      <th scope="col">Category</th>
                      <th scope="col">description</th>
                      <th scope="col">Purchased </th>
                    </tr>
                  </thead>
                  <tbody>
                    {auth.user.purchase.map((p) => (
                      <Fragment>
                        <tr>
                          <td>{p.name}</td>
                          <td>{p.price} €</td>
                          <td>{p.category}</td>
                          <td>{p.description.slice(0, 70)}</td>
                          <td>
                            <Moment format="YY/MM/DD:HH:MM">
                              {p.createdAt}
                            </Moment>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Fragment>
                  <h2 className="mb-4">
                    <i className="fa fa-opencart text-success" /> You do not
                    have yet purchased products{" "}
                  </h2>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Account.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateTopProps = (state) => ({
  auth: state.auth,
});
export default connect(
  mapStateTopProps,
  { updateUserProfile }
)(Account);
