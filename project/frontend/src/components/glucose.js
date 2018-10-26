import React, { Component } from 'react';

class Glucose extends Component {
  render() {
    return (
      <div className="container">

      <h1 className="form-heading">Add Glucose Measurement</h1>

      <div className="login-form">
      <form id="Login" onSubmit={this.handleLogin}>

          <div className="form-group">
            <input type="email" name="email" className="form-control" placeholder="Date" onChange={this.handleInputChange}/>
          </div>

          <div className="form-group">
            <input type="password" name="password" className="form-control" placeholder="Value" onChange={this.handleInputChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>

      </form>
      </div>

      </div>
    );
  }
}

export default Glucose;
