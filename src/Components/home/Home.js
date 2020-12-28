import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddProduct from "../product/AddProduct";
import ProductList from "../product/ProductList";
import ViewProduct from "../product/ViewProduct";

class Home extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/products" component={ProductList} />
          <Route path="/addproduct/:id" component={AddProduct} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/product/:id" component={ViewProduct} />
          <Redirect from="/" to="/products" />
        </Switch>
      </div>
    );
  }
}

export default React.memo(Home);
