import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { addProductToCart } from "../../../actions/user";
import {
  searchByCategory,
  searchByPrice,
  searchProduct,
} from "../../../actions/product";
import ProductComponent from "./ProductComponent";
const SearchProducts = ({
  searchByCategory,
  searchProduct,
  searchByPrice,
  product: { loading, productsByCategory, productsByPrice, searchProducts },
}) => {
  const [searchKey, setsearchKey] = useState("");
  const vegetable = () => !loading && searchByCategory("Vegetable");
  const meat = () => !loading && searchByCategory("Meat");
  const fruit = () => !loading && searchByCategory("Fruit");
  const costume = () => !loading && searchByCategory("Costume");
  const tools = () => !loading && searchByCategory("Tools");
  const lessthanTwenty = () => !loading && searchByPrice(20);
  const lessThanFifty = () => !loading && searchByPrice(50);
  const lessThanSeventyFive = () => !loading && searchByPrice(75);
  const lessThanOneHundered = () => !loading && searchByPrice(100);
  const onSubmit = (e) => {
    e.preventDefault();
    searchProduct(searchKey);
  };
  if (loading === true) {
    return <Spinner />;
  }
  if (loading === false) {
    return (
      <div className="container">
        <div className="my-2 p-1">
          <form onSubmit={onSubmit}>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search a product...."
                aria-label="Search a product...."
                aria-describedby="basic-addon2"
                onChange={(e) => setsearchKey(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="input-group-text btn btn-outline-secondary"
                  id="basic-addon2"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div data-toggle="buttons" className="my-1">
            <button
              type="radio"
              name="options"
              id="option3"
              className="btn btn-outline-secondary mr-1 mb-1"
              onClick={() => vegetable()}
            >
              vegetable
            </button>

            <button
              type="radio"
              name="options"
              id="option3"
              onClick={() => fruit("fruit")}
              className="btn btn-outline-secondary  mr-1 mb-1 "
            >
              Fruit
            </button>

            <button
              type="radio"
              name="options"
              id="option3"
              onClick={() => meat("Meat")}
              className="btn btn-outline-secondary  mr-1 mb-1"
            >
              Meat
            </button>

            <button
              type="radio"
              name="options"
              id="option3"
              onClick={() => tools("Tools")}
              className="btn btn-outline-secondary  mr-1 mb-1"
            >
              Tools
            </button>

            <button
              type="radio"
              name="options"
              id="option3"
              onClick={() => costume("Costume")}
              className="btn btn-outline-secondary  mr-1 mb-1"
            >
              costume
            </button>
            <button
              type="radio"
              name="options"
              id="option3"
              className="btn btn-outline-secondary mr-1 mb-1"
              onClick={() => lessthanTwenty(20)}
            >
              {"< 20"} €
            </button>

            <button
              type="radio"
              name="options"
              id="option3"
              onClick={() => lessThanFifty(50)}
              className="btn btn-outline-secondary mr-1 mb-1 "
            >
              {"< 50"} €
            </button>

            <button
              type="radio"
              name="options"
              id="option3"
              onClick={() => lessThanSeventyFive(75)}
              className="btn btn-outline-secondary mr-1 mb-1"
            >
              {"< 75"} €
            </button>

            <button
              type="radio"
              name="options"
              id="option3"
              onClick={() => lessThanOneHundered(99)}
              className="btn btn-outline-secondary mb-1 "
            >
              {"< 100"} €
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          {!loading && <ProductComponent products={productsByCategory} />}
          {!loading && searchKey !== "" && (
            <ProductComponent products={searchProducts} />
          )}
          {!loading && <ProductComponent products={productsByPrice} />}
        </div>
      </div>
    );
  }
};

SearchProducts.propTypes = {
  searchByCategory: PropTypes.func.isRequired,
  searchByPrice: PropTypes.func.isRequired,

  addProductToCart: PropTypes.func.isRequired,
  searchProducts: PropTypes.func.isRequired,

  product: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
});
export default connect(
  mapStateToProps,
  {
    addProductToCart,
    searchByCategory,
    searchByPrice,
    searchProduct,
  }
)(SearchProducts);
