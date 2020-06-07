import {
  GET_USERS,
  ADD_PRODUCTS_TO_CART,
  ADD_PRODUCTS_TO_CART_FAIL,
  GET_PRODUCTS_FROM_CART,
  DELETE_PRODUCTS_FROM_CART,
  BUY_PRODUCT,
  BUY_PRODUCT_FAIL,
  GET_BOUGHT_PRODUCTS,
} from "../actions/types";

const initialState = {
  cart: [],
  user: [],
  loading: true,
  purchases: {},
  errors: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCTS_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_PRODUCTS_FROM_CART:
      return {
        ...state,
        cart: payload,
        loading: false,
      };
    case BUY_PRODUCT:
      return {
        ...state,
        purchases: [...state.purchases, payload],
        loading: false,
      };
    case GET_BOUGHT_PRODUCTS:
      return { ...state, payload, loading: false };
    case BUY_PRODUCT_FAIL:
      return { ...state, purchase: null, loading: false };
    case DELETE_PRODUCTS_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== payload),
      };
    case ADD_PRODUCTS_TO_CART_FAIL:
      return {
        ...state,
        payload,
        loading: false,
      };
    default:
      return state;
  }
}
