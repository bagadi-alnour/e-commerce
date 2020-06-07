import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchProducts from "./SearchProducts";
import { getProducts } from "../../../actions/product";
import { getCartProducts } from "../../../actions/user";
import ProductComponent from "./ProductComponent";
import { Helmet } from "react-helmet";
import Pagination from "./Pagination";
const ProductList = ({
  getProducts,
  getCartProducts,
  product: { products, loading },
}) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);
  useEffect(() => {
    getProducts();
    getCartProducts();
  }, []);

  // Get current posts
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setcurrentPage(pageNumber);
  return (
    <div className="container px-0">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AZrica | Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <SearchProducts />
      <div className="row p-0 m-0">
        <div className="col-md-12" />
        <div className="col-lg-12 col-md-10 col-sm-12 my-2 text-dark">
          <div className="row">
            {!loading && <ProductComponent products={currentProducts} />}
          </div>
        </div>
        <div className="col-lg-12 col-md-10 col-sm-12 my-3 text-dark">
          <Pagination
            className=""
            productsPerPage={productPerPage}
            totalProducts={products.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getCartProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  { getProducts, getCartProducts }
)(ProductList);
