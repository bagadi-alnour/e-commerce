import { combineReducers } from "redux";
import admin from "./admin";
import product from "./product";
import user from "./user";
import alert from "./alert";
import auth from "./auth";
export default combineReducers({ admin, product, user, alert, auth });
