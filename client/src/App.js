import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/home/Landing";
import Account from "./components/user/Account";
import about from "./components/about";
import Cart from "./components/user/Cart";
import Register from "./components/Auth/Register";
import AddProduct from "./components/dashboard/product/AddProduct";
import Login from "./components/Auth/Login";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { statistic } from "./actions/auth";
import EditProduct from "./components/dashboard/product/EditProduct";
import Product from "./components/dashboard/product/Product";
import BuyProudct from "./components/home/products/BuyProudct";
import "react-toastify/dist/ReactToastify.css";
import Alert from "./components/layout/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(statistic());
  }, []);

  return (
    // Provider: wraps the React application and makes the Redux state available to all container components in the application’s hierarchy
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Fragment>
            <div className="container my-2">
              <Alert />
            </div>
            <div className="container-fluid p-0 m-0">
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </div>
            <Route exact path="/" component={Landing} />

            <PrivateRoute exact path="/new-product" component={AddProduct} />
            <PrivateRoute
              exact
              path="/edit-product/:id"
              component={EditProduct}
            />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/account" component={Account} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/buy/:id" component={BuyProudct} />
            <Route exact path="/about" component={about} />
          </Fragment>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
