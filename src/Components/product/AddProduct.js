import axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastr";
import { Button } from "reactstrap";
import { APIConstants } from "../common/Contants";

class AddProduct extends Component {
  state = {
    title: "",
    price: "",
    tags: "",
    quantity: "",
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(
          `${APIConstants.urlroot}${APIConstants.products}/` +
            this.props.match.params.id
        )
        .then((res) => {
          this.setState({ ...res.data.product });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidUpdate(prevState, prevProps) {}
  componentWillUnmount() {}
  onFormInputHandler = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmitHandler = () => {
    // this.props.addProduct(this.state);
    const data = { ...this.state, _id: this.state.id };
    if (!this.props.match.params.id) {
      axios
        .post(APIConstants.urlroot + APIConstants.products, data)
        .then((res) => {
          if (res.status === 201) {
            toast(res.data.message);
            this.setState({ title: "", price: "", tags: "", quantity: "" });
            this.props.history.push("/products");
          }
        });
    } else {
      axios
        .put(
          APIConstants.urlroot +
            APIConstants.products +
            "/" +
            this.props.match.params.id,
          data
        )
        .then((res) => {
          if (res.status === 200) {
            toast(res.data.message);
            this.setState({ title: "", price: "", tags: "", quantity: "" });
            this.props.history.push("/products");
          }
        });
    }
  };
  goBackToProductList = () => {
    this.props.history.push("/product");
  };
  render() {
    return (
      <div>
        <ToastContainer />
        <div className="d-flex justify-content-end">
          <Button color="primary" onClick={this.goBackToProductList}>
            Back
          </Button>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={this.state.title}
            onChange={this.onFormInputHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={this.state.price}
            onChange={this.onFormInputHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Tags" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            value={this.state.tags}
            onChange={this.onFormInputHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            value={this.state.quantity}
            onChange={this.onFormInputHandler}
          />
        </div>

        <button className="btn btn-primary" onClick={this.onSubmitHandler}>
          Submit
        </button>
      </div>
    );
  }
}

export default AddProduct;
