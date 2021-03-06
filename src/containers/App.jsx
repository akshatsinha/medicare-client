import React, { Component } from 'react';
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App
