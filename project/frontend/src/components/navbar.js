import React, { Component } from 'react';
import $ from 'jquery';

class NavBar extends Component {

  state = {}

  logout = () => {
    this.props.handleLogin(false, null);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Glucose App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a onClick={() => this.props.changePage('glucose')} className="nav-link" href="#">Add new <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item my-2 my-lg-0">
              <a onClick={() => this.props.changePage('graph')} className="nav-link" href="#">Graph</a>
            </li>
            <li className="nav-item my-2 my-lg-0">
              <a onClick={() => this.props.changePage('tips')} className="nav-link" href="#">Tips</a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li style={{marginRight: 10}}><a href="#">{this.props.user.email}</a></li>
            <li><a href="#" onClick={this.logout}>Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
