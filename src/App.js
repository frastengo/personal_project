import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Header from './components/Header/Header'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <Link to = '/'>Home</Link>
        <Link to = '/profile'>Profile</Link>
        <Link to = '/create'>New Profile</Link> */}
        {routes}
      </div>
    );
  }
}

export default App;
