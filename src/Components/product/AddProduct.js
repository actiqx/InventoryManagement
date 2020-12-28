import axios from "axios";
import React, { Component } from "react";

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
        .get("http://localhost:4000/productList/" + this.props.match.params.id)
        .then((res) => {
          this.setState({ ...res.data });
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
    const data = this.state;
    if (!this.props.match.params.id) {
      axios.post("http://localhost:4000/productList", data).then((res) => {
        if (res.status === 201) {
          this.setState({ title: "", price: "", tags: "", quantity: "" });
          this.props.history.push("/products");
        }
      });
    } else {
      axios
        .patch(
          "http://localhost:4000/productList/" + this.props.match.params.id,
          data
        )
        .then((res) => {
          if (res.status === 200) {
            this.setState({ title: "", price: "", tags: "", quantity: "" });
            this.props.history.push("/products");
          }
        });
    }
  };
  render() {
    return (
      <div>
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
