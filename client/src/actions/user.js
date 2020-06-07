import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_USERS,
  ADD_PRODUCTS_TO_CART,
  ADD_PRODUCTS_TO_CART_FAIL,
  GET_PRODUCTS_FROM_CART,
  DELETE_PRODUCTS_FROM_CART,
  DELETE_PRODUCTS_FROM_CART_FAIL,
  BUY_PRODUCT,
  BUY_PRODUCT_FAIL,
  GET_BOUGHT_PRODUCTS,
} from "./types";
// Get All users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user/");
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(setAlert("Unable to retrieve all users", "danger"));
  }
};

export const addProductToCart = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/cart/${id}`);

    dispatch({
      type: ADD_PRODUCTS_TO_CART,
      payload: res.data,
    });
    dispatch(setAlert("Product added to cart", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ADD_PRODUCTS_TO_CART_FAIL,
    });
  }
};
export const getCartProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cart/`);
    dispatch({
      type: GET_PRODUCTS_FROM_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_PRODUCTS_TO_CART_FAIL,
    });
  }
};

// Delete product
export const deleteProductFromUserCart = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/cart/${id}`);
    dispatch({
      type: DELETE_PRODUCTS_FROM_CART,
      payload: id,
    });
    dispatch(setAlert("Product deleted from cart successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: DELETE_PRODUCTS_FROM_CART_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("Unable to delete this product...", "danger"));
  }
};
// Buy a product
export const buyProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/purchase/${id}`);
    dispatch({
      type: BUY_PRODUCT,
      paload: res.data,
    });
    dispatch(
      setAlert(
        "Product has been purchased, you'll recieve an email with all details",
        "success"
      )
    );
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: BUY_PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("Unable to buy this product...", "danger"));
  }
};

// Get all purchaed products
export const purchasedProduct = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/purchase`);
    dispatch({ type: GET_BOUGHT_PRODUCTS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: BUY_PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("Unable to get products...", "danger"));
  }
};
