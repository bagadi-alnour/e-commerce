import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { productbyId } from "../../../actions/product";
import { Helmet } from "react-helmet";
import { updateProduct } from "../../../actions/product";
const EditProduct = ({
  productbyId,
  updateProduct,
  history,
  match,
  product: { loading, getProductById },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    weight: "",
    quantity: "",
    description: "",
    id: "",
  });
  const { name, price, category, weight, quantity, description } = formData;
  useEffect(
    () => {
      productbyId(match.params.id);
      setTimeout(() => {
        setFormData({
          name: getProductById.name,
          price: getProductById.price,
          category: getProductById.category,
          weight: getProductById.weight,
          quantity: getProductById.quantity,
          description: getProductById.description,
          id: match.params.id,
        });
      }, 500);
    },
    [loading]
  );
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (loading === true) {
    return <Spinner />;
  } else {
    return (
      <div className="container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>AZrica | Edit product</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <button
          onClick={() => history.goBack()}
          className="border border-0 my-2  bg-white"
        >
          <i className="fa fa-arrow-left" /> Go back
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProduct(formData);
          }}
        >
          <h3 className="my-3">
            <i className="fa fa-plus" /> Edit product
          </h3>
          <div className="row my-4">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label htmlfor="name">Name</label>
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  name="name"
                  id="name"
                  aria-describedby="helpId"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label htmlfor="price">Price</label>
                <input
                  value={price}
                  type="text"
                  className="form-control"
                  name="price"
                  id="price"
                  aria-describedby="helpId"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label htmlfor="weight">Weight </label>
                <input
                  type="text"
                  className="form-control"
                  name="weight"
                  id="weight"
                  aria-describedby="helpId"
                  value={weight}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label htmlfor="category">Category</label>
                <select
                  className="form-control"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => onChange(e)}
                >
                  <option>Product Category</option>
                  <option>Vegetable</option>
                  <option>Fruit</option>
                  <option>Meat</option>
                  <option>Tools</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label htmlfor="quantity">Quantity </label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  id="quantity"
                  aria-describedby="helpId"
                  value={quantity}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="form-group">
                <div className="form-group">
                  <label htmlfor="description">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    rows="5"
                    value={description}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-dark">
            Edit product
          </button>
        </form>
      </div>
    );
  }
};

EditProduct.propTypes = {
  product: PropTypes.object.isRequired,
  updateProduct: PropTypes.func.isRequired,
  productbyId: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
});
export default connect(
  mapStateToProps,
  { productbyId, updateProduct }
)(EditProduct);
