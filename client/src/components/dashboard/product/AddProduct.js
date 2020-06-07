import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addProduct } from "../../../actions/product";
import { storage } from "./firebase";
import { Helmet } from "react-helmet";
const AddProduct = ({ addProduct, history }) => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [weight, setweight] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setimageUrl] = useState([]);
  const [quantity, setquantity] = useState("");
  const [description, setdescription] = useState("");
  const [progress, setprogress] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const changeName = (e) => setname(e.target.value);
  const changePrice = (e) => setprice(e.target.value);
  const changeCategory = (e) => setcategory(e.target.value);
  const changeWeight = (e) => setweight(e.target.value);
  const changeDescription = (e) => setdescription(e.target.value);
  const changeQuantity = (e) => setquantity(e.target.value);

  const changeImagesUrl = (e) => {
    e.target.files && setImage(e.target.files[0]);
  };

  const formData = {
    name,
    description,
    price,
    imageUrl,
    weight,
    category,
    quantity,
  };
  const addImage = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snpshot) => {
        setprogress(
          Math.round(snpshot.bytesTransferred / snpshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setimageUrl([...imageUrl, url]);
            setisLoading(false);
          });
      }
    );
  };

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AZrica | Add product</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <button
        onClick={() => history.goBack()}
        className="border border-0 my-2  bg-white"
      >
        <i className="fa fa-arrow-left" /> Go back
      </button>
      <h3 className="my-3">
        <i className="fa fa-plus" /> Add new product
      </h3>
      <div className="row my-4">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              aria-describedby="helpId"
              placeholder="Product Name...."
              onChange={(e) => changeName(e)}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              id="price"
              aria-describedby="helpId"
              placeholder="Product Price...."
              onChange={(e) => changePrice(e)}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="form-group">
            <label htmlFor="weight">Weight </label>
            <input
              type="text"
              className="form-control"
              name="weight"
              id="weight"
              aria-describedby="helpId"
              placeholder="Product Weight...."
              onChange={(e) => changeWeight(e)}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              name="category"
              id="category"
              onChange={(e) => changeCategory(e)}
            >
              <option>Product Category</option>
              <option>Vegetable</option>
              <option>Fruit</option>
              <option>Meat</option>
              <option>Tools</option>
              <option>Costume</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="form-group">
            <label htmlFor="quantity">Quantity </label>
            <input
              type="text"
              className="form-control"
              name="quantity"
              id="quantity"
              aria-describedby="helpId"
              placeholder="Product Quantity...."
              onChange={(e) => changeQuantity(e)}
            />
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                rows="5"
                onChange={(e) => changeDescription(e)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h5 className="my-2">Upload Images</h5>
          <input
            multiple
            type="file"
            name="imageUrl"
            id="imageUrl"
            onChange={(e) => changeImagesUrl(e)}
          />
          {imageUrl === undefined || imageUrl.length == 0 ? (
            <button className=" btn btn-success my-2 ml-3" onClick={addImage}>
              Add image
            </button>
          ) : (
            <button className="btn btn-success my-2 ml-3" onClick={addImage}>
              Add another image
            </button>
          )}
        </div>
        {!isLoading && imageUrl[0] && (
          <div className="col-lg-4 col-md-4 col-sm-12">
            <img
              src={imageUrl[0]}
              className="img-reponsive"
              width="350"
              height="350"
              alt="product"
            />
          </div>
        )}
        {!isLoading && imageUrl[1] && (
          <div className="col-lg-4 col-md-4 col-sm-12">
            <img
              src={imageUrl[1]}
              className="img-reponsive"
              width="350"
              height="350"
              alt="product"
            />
          </div>
        )}
        {!isLoading && imageUrl[2] && (
          <div className="col-lg-4 col-md-4 col-sm-12">
            <img
              src={imageUrl[2]}
              className="img-reponsive"
              width="350"
              height="350"
              alt="product"
            />
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          addProduct(formData, history);
        }}
        type="submit"
        className="btn btn-outline-dark my-4"
      >
        Add The product
      </button>
    </div>
  );
};

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addProduct }
)(withRouter(AddProduct));
