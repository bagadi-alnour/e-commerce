import {
  ADD_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCT_BY_CATEGORY,
  GET_PRODUCT_BY_CATEGORY_FAIL,
  GET_PRODUCT_BY_PRICE,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_PRICE_FAIL,
  SEARCH_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FAIL,
} from "../actions/types";

const initialState = {
  product: null,
  products: [],
  productsByCategory: [],
  productsByPrice: [],
  searchProducts: [],
  getProductById: {},
  error: [],
  loading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case GET_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        productsByCategory: payload,
        loading: false,
      };
    case GET_PRODUCT_BY_PRICE:
      return {
        ...state,
        productsByPrice: payload,
        loading: false,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        getProductById: payload,
        loading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        payload,
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        errors: payload,
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        searchProducts: payload,
        loading: false,
      };
    case GET_PRODUCT_BY_PRICE_FAIL:
      return {
        ...state,
        productsByPrice: null,
        error: payload,
        loading: false,
      };
    case GET_PRODUCT_BY_CATEGORY_FAIL:
      return {
        ...state,
        productByCategory: null,
        erorr: payload,
        loading: false,
      };
    case GET_PRODUCT_BY_ID_FAIL:
      return {
        ...state,
        getProductById: null,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        product: null,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
