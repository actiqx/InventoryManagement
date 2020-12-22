import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { Component } from "react";
import { Table } from "reactstrap";

class ProductList extends Component {
  state = {
    productList: [],
  };

  getAllData = () => {
    axios.get("http://localhost:4000/productList").then((res) => {
      this.setState({ productList: res.data });
    });
  };
  componentDidMount() {
    // axios.get("http://localhost:4000/productList").then((res) => {
    //   this.setState({ productList: res.data });
    // });
    this.getAllData();
  }
  setProductId = (id, viewtype) => {
    if (viewtype === "view") {
      this.props.history.push("/product/" + id);
    } else {
      this.props.history.push("/addproduct/" + id);
    }
  };
  deleteProduct = (id) => {
    axios.delete("http://localhost:4000/productList/" + id).then((res) => {
      this.getAllData();
    });
  };
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Tags</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.productList.map((product, key) => {
            return (
              <tr key={key}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.tags}</td>
                <td>{product.quantity}</td>
                <td>
                  <EyeOutlined
                    className="mr-2"
                    onClick={() => this.setProductId(product.id, "view")}
                  />
                  <EditOutlined
                    className="mr-2"
                    onClick={() => this.setProductId(product.id, "edit")}
                  />
                  <DeleteOutlined
                    className="mr-2"
                    onClick={() => this.deleteProduct(product.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default ProductList;
