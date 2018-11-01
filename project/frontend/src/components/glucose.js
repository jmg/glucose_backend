import React, { Component } from 'react';
import BaseComponent from "./base"
import Api from "../helpers/api";
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';

class Glucose extends BaseComponent {

  handleSubmit = (event) => {
    event.preventDefault();
    let data = this.state;

    Api.post({
      "endpoint": "glucose/measure",       
      "user": this.props.user,
      "data": data, 
      "success": (res) => {
        alert("Saved!");
      }, 
      "failure": (res) => {
        this.showError(res)
      }
    });
  }

  showError = (res) => {
    alert("An error ocurred.");
    console.log(res);
  }

  componentDidMount() {    
    $('.datepicker').datepicker()
  }

  render() {
    return (
      <div className="container">

      <h1 className="form-heading">Add Glucose Measurement</h1>

      <div className="login-form">
      <form id="Login" onSubmit={this.handleSubmit}>

          <div className="form-group">
            <input type="text" name="date" className="form-control datepicker" placeholder="Date" onChange={this.handleInputChange} autocomplete="off" required/>
          </div>

          <div className="form-group">
            <input type="number" name="value" className="form-control" placeholder="Value" onChange={this.handleInputChange} required/>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>

      </form>
      </div>

      </div>
    );
  }
}

export default Glucose;
