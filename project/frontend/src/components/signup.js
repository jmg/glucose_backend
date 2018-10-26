import React, { Component } from 'react';
import $ from 'jquery';
import "./css/login.css"

class Signup extends Component {

  state = {}

  showLogin = () => {

    //show signup
    this.props.changePage("login");
  }

  handleSignup = (event) => {

    event.preventDefault();
    let headers = {
        'Access-Control-Allow-Origin' : '*',
        'Content-type': "application/json"
    }
    let data = this.state;

    $.ajax("http://localhost:5000/auth/register", {data: JSON.stringify(data), type: "POST", headers: headers })
    .then((res) => {
      if (res.status == "success") {
        data["auth_token"] = res.auth_token
        this.props.handleLogin(true, data);
      } else {
        this.showError()
      }
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
