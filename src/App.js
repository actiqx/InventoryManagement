import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AppLayout from "./Components/AppLayout";
import AddProduct from "./Components/product/AddProduct";
import ProductList from "./Components/product/ProductList";
import ViewProduct from "./Components/product/ViewProduct";
class App extends Component {
  render() {
    return (
      <Router>
        <AppLayout>
          <Switch>
            <Route path="/products" component={ProductList} />
            <Route path="/addproduct/:id" component={AddProduct} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/product/:id" component={ViewProduct} />
            <Redirect from="/" to="/products" />
          </Switch>
        </AppLayout>
      </Router>
    );
  }
}

export default App;
