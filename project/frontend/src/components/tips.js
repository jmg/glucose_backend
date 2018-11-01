import React, { Component } from 'react';
import BaseComponent from "./base"
import Api from "../helpers/api";

class Tips extends BaseComponent {

  state = {
    tips: []
  }

  get_tips = () => {

    Api.get({
      "endpoint": "glucose/tips/all",       
      "user": this.props.user,      
      "success": (res) => {        
        this.setState({
          tips: res.tips
        })
      }, 
      "failure": (res) => {
        alert(res.message)
      }
    });
  }

  componentDidMount() {    
    this.get_tips()
  }

  render() {
    return (
      <div className="container">

      <h1 className="form-heading">Tips</h1>
      
      <div>{this.state.tips.map((tip) => <li><a target="_blank" href={tip.link}>{tip.title}</a></li> )}</div>

      </div>
    );
  }
}

export default Tips;
