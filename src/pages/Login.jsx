import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { createUser } from "../services/userAPI";
import Loading from "../components/Loading";
import "../styles/Login.css";
import logo from "../styles/assets/logo.svg";

class Login extends Component {
  state = {
    name: "",
    disabledButton: true,
    loginStatus: "FALSE",
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      const { name } = this.state;
      const minimumLength = 2;
      const isDisabled = name.length <= minimumLength;
      this.setState({ disabledButton: isDisabled });
    });
  };

  saveUser = async () => {
    const { name } = this.state;
    this.setState({ loginStatus: "PENDING" }, async () => {
      const loggedIn = await createUser({ name });
      this.setState({ loginStatus: loggedIn });
    });
  };

  render() {
    const { name, disabledButton, loginStatus } = this.state;
    return (
      <div data-testid="page-login">
        {loginStatus === "FALSE" ? (
          <div className="login-form-container">
            <div className="login-form">
              <img src={logo} alt="miawtunes" />
              <h1>Faça seu Login primeiro!</h1>

              <input
                data-testid="login-name-input"
                id="name-input"
                type="text"
                value={name}
                placeholder="Miaw usuário"
                onChange={this.handleChange}
              />

              <button
                data-testid="login-submit-button"
                type="button"
                onClick={this.saveUser}
                disabled={disabledButton}
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div>
            {loginStatus === "PENDING" ? (
              <Loading />
            ) : (
              <Redirect to="/search" />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Login;
