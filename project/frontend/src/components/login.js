import React, { Component } from 'react';
import Api from "../helpers/api";
import BaseComponent from "./base"
import "./css/login.css"


class Login extends BaseComponent {

  state = {}

  showRegister = () => {

    this.props.changePage("signup");
  }

  showError = () => {
    alert("Invalid Login Credentials.")
  }

  handleLogin = (event) => {

    event.preventDefault();
    let data = this.state;

    Api.post({
      "endpoint": "auth/login",       
      "data": data, 
      "success": (res) => {
        data["auth_token"] = res.auth_token
        this.props.handleLogin(true, data);
      }, 
      "failure": (res) => {
        this.showError()
      }
    });
  }

  render() {
    return (
    <div className="container">
      <h1 className="form-heading">Login</h1>
      <div className="login-form">
        <div className="main-div">
        <form id="Login" onSubmit={this.handleLogin}>

          <div className="form-group">
            <input type="email" name="email" className="form-control" placeholder="Email Address" onChange={this.handleInputChange}/>
          </div>

          <div className="form-group">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleInputChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>

          <div className="or-login">
          <a href="#" onClick={this.showRegister}>Or Signup</a>
          </div>

        </form>
        </div>
      </div>
    </div>
    );
  }
}

export default Login;
