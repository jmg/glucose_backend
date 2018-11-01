import React, { Component } from 'react';
import Api from "../helpers/api";
import BaseComponent from "./base"
import "./css/login.css";

class Signup extends BaseComponent {

  state = {}

  showLogin = () => {

    this.props.changePage("login");
  }

  handleSignup = (event) => {

    event.preventDefault();    
    let data = this.state;

    Api.post({
      "endpoint": "auth/register",       
      "data": data, 
      "success": (res) => {
        data["auth_token"] = res.auth_token
        this.props.handleLogin(true, data);
      }, 
      "failure": (res) => {
        this.showError(res)
      }
    });
  }

  showError = (res) => {
    alert(res.message);
    console.log(res);
  }
  
  render() {
    return (
    <div className="container">
      <h1 className="form-heading">Singup</h1>
      <div className="login-form">
        <div className="main-div">
        <form id="Login" onSubmit={this.handleSignup}>

          <div className="form-group">
            <input type="email" name="email" className="form-control" placeholder="Email Address" onChange={this.handleInputChange}/>
          </div>

          <div className="form-group">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleInputChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>

          <div className="or-login">
          <a href="#" onClick={this.showLogin}>Or Login</a>
          </div>

        </form>
        </div>
      </div>
    </div>
    );
  }
}

export default Signup;
