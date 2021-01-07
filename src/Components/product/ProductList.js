import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { Component, createRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Table } from "reactstrap";
import { APIConstants } from "../common/Contants";

class ProductList extends Component {
  state = {
    productList: [],
  };
  container = createRef();
  getAllData = () => {
    axios.get(APIConstants.urlroot + APIConstants.products).then((res) => {
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
    axios
      .delete(APIConstants.urlroot + APIConstants.products + "/" + id)
      .then((res) => {
        toast(res.data.message);
        this.getAllData();
      });
  };
  render() {
    return (
      <>
        <ToastContainer />
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
                <tr key={key + 1}>
                  <td>{key}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.tags}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <EyeOutlined
                      className="mr-2"
                      onClick={() => this.setProductId(product._id, "view")}
                    />
                    <EditOutlined
                      className="mr-2"
                      onClick={() => this.setProductId(product._id, "edit")}
                    />
                    <DeleteOutlined
                      className="mr-2"
                      onClick={() => this.deleteProduct(product._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ProductList;
