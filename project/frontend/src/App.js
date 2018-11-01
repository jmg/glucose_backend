import React, { Component } from 'react';
import Glucose from './components/glucose';
import Login from './components/login';
import Graph from './components/graph';
import Tips from './components/tips';
import Signup from './components/signup';
import NavBar from './components/navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  state = {
    loggedIn: false,
    page: "glucose",
    user: null
  }

  componentDidMount() {       
    
    document.title = "Glucose"

    let state = null
    try {
      state = JSON.parse(localStorage.getItem("current_state"));
    } catch (e) {
    }
    if (state) {
      this.setState(state)
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
    let state = this.state
    state["page"] = page  
    this.setState(state);        
    localStorage.setItem("current_state", JSON.stringify(state));
  }

  handleLogin(loggedIn, user) {
    let state = {
      loggedIn: loggedIn,
      page: "glucose",
      user: user,
    }
    this.setState(state);
    localStorage.setItem("current_state", JSON.stringify(state));
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
      return <Glucose loggedIn={this.state.loggedIn} changePage={this.changePage.bind(this)} user={this.state.user}/>;
    } else if (this.state.page == "tips") {
      return <Tips loggedIn={this.state.loggedIn} changePage={this.changePage.bind(this)} user={this.state.user}/>;
    } else if (this.state.page == "graph") {
      return <Graph loggedIn={this.state.loggedIn} changePage={this.changePage.bind(this)} user={this.state.user}/>;
    }
  }

  renderNavBar() {

    if (this.state.loggedIn) {
      return <NavBar handleLogin={this.handleLogin.bind(this)} changePage={this.changePage.bind(this)} user={this.state.user} page={this.state.page}/>
    }
  }
}

export default App;
