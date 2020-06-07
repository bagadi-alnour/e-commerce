import {
  REGISTER_SECCESS,
  LOGIN_SECCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  STATISTIC,
  PRODUCT_ERROR,
  UPDATE_USER_PROFILE,
} from "../actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: {},
  statistic: [],
  errors: [],
};

export default function(state = initalState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case STATISTIC:
      return {
        ...state,
        statistic: payload,
        loading: false,
      };
    case REGISTER_SECCESS:
    case LOGIN_SECCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        payload,
        isAuthenticated: true,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        errors: payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: payload,
      };

    default:
      return state;
  }
}
