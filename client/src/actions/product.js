import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_CATEGORY,
  SEARCH_PRODUCT,
  GET_PRODUCT_BY_CATEGORY_FAIL,
  GET_PRODUCT_BY_PRICE,
  GET_PRODUCT_BY_PRICE_FAIL,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_FAIL,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FAIL,
} from "./types";
// Add new product
export const addProduct = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/product", formData, config);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
    dispatch(setAlert("Product Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get All products
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/product");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? This can not be undone ")) {
    try {
      await axios.delete(`api/product/${id}`);
      dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
      dispatch(setAlert("Product deleted successfully", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
// Get product by id

export const productbyId = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${id}`);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_PRODUCT_BY_ID_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Search product by name & description
export const searchProduct = (searchKey) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/search/${searchKey}`);
    dispatch({
      type: SEARCH_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get a product by category
export const searchByCategory = (category) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/category/${category}`);
    dispatch({
      type: GET_PRODUCT_BY_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_PRODUCT_BY_CATEGORY_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
/// Search products by price
export const searchByPrice = (price) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/price/${price}`);
    dispatch({
      type: GET_PRODUCT_BY_PRICE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: GET_PRODUCT_BY_PRICE_FAIL,
    });
  }
};
// update user profile
export const updateProduct = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/product/update", formData, config);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
    dispatch(setAlert("Product updated...", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: UPDATE_PRODUCT_FAIL });
    dispatch(setAlert("Unable to update this product....", "danger"));
  }
};
