import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from "./Components/AppLayout";
import AddProduct from "./Components/product/AddProduct";
import ProductList from "./Components/product/ProductList";
class App extends Component {
  render() {
    return (
      <Router>
        <AppLayout>
          <Switch>
            <Route path="/products" component={ProductList} />
            <Route path="/addproduct" component={AddProduct} />
          </Switch>
        </AppLayout>
      </Router>
    );
  }
}

export default App;
