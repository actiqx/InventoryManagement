import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APIConstants } from "../common/Contants";
import "./login.css";
class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onChangeHandler = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value });
  };
  onSubmitHandler = (evt) => {
    evt.preventDefault();

    axios
      .post(`${APIConstants.urlroot}${APIConstants.login}/`, {
        email: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem("user", res.data.userID);
        localStorage.setItem("token", res.data.token);
      });

    this.props.history.push("/");
  };
  render() {
    return (
      <div id="login">
        <h3 class="text-center text-white pt-5">Login form</h3>
        <div class="container">
          <div
            id="login-row"
            class="row justify-content-center align-items-center"
          >
            <div id="login-column" class="col-md-6">
              <div id="login-box" class="col-md-12">
                <form
                  id="login-form"
                  class="form"
                  onSubmit={this.onSubmitHandler}
                >
                  <h3 class="text-center text-info">Login</h3>
                  <div class="form-group">
                    <label for="username" class="text-info">
                      Username:
                    </label>
                    <br />
                    <input
                      type="text"
                      name="username"
                      id="username"
                      class="form-control"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div class="form-group">
                    <label for="password" class="text-info">
                      Password:
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div class="form-group">
                    <label for="remember-me" class="text-info">
                      <span>Remember me</span> 
                      <span>
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                        />
                      </span>
                    </label>
                    <br />
                    <input
                      type="submit"
                      name="submit"
                      class="btn btn-info btn-md"
                      value="submit"
                    />
                  </div>
                  <div id="register-link" class="text-right">
                    <Link to="/register">Register here</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
