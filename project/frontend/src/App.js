import React, { Component } from 'react';
import Glucose from './components/glucose';
import Login from './components/login';
import Graph from './components/graph';
import Tips from './components/tips';
import Signup from './components/signup';
import NavBar from './components/navbar';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  state = {
    loggedIn: false,
    page: "glucose",
    user: null
  }

  constructor() {
    super()
    let user = null
    try {
       user = JSON.parse(localStorage.getItem("current_user"));
    } catch (e) {
    }
    if (user) {
      this.state = {
        loggedIn: true,
        page: "glucose",
        user: user
      }
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderNavBar()}
        <header className="App-header">
          {this.renderApp()}
        </header>
      </div>
    );
  }

  changePage(page) {
    this.setState({
      page: page
    });
  }

  handleLogin(loggedIn, user) {
    this.setState({
      loggedIn: loggedIn,
      user: user,
    });

    localStorage.setItem("current_user", JSON.stringify(user));
  }


  renderApp() {
    if (this.state.loggedIn) {
      return this.renderPage();
    } else {
      if (this.state.page == "signup") {
        return <Signup loggedIn={this.state.loggedIn} handleLogin={this.handleLogin.bind(this)} changePage={this.changePage.bind(this)}/>;
      } else {
        return <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin.bind(this)} changePage={this.changePage.bind(this)}/>;
      }
    }
  }

  renderPage() {
    if (this.state.page == "glucose") {
      return <Glucose loggedIn={this.state.loggedIn} changePage={this.changePage.bind(this)}/>;
    } else if (this.state.page == "tips") {
      return <Tips loggedIn={this.state.loggedIn} changePage={this.changePage.bind(this)}/>;
    } else if (this.state.page == "graph") {
      return <Graph loggedIn={this.state.loggedIn} changePage={this.changePage.bind(this)}/>;
    }
  }

  renderNavBar() {

    if (this.state.loggedIn) {
      return <NavBar handleLogin={this.handleLogin.bind(this)} changePage={this.changePage.bind(this)} user={this.state.user}/>
    }
  }
}

export default App;
