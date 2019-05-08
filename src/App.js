import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


class App extends Component {
  render() {
    return (
      
      <div className="App">
          <Header />
          <main>
            {routes}
          </main>
          <Footer/>
      </div>
        
        
      
    );
  }
}

export default App;

// #page-container {
//   position: relative;
//   min-height: 100vh;
// }
// #content-wrap {
//   padding-bottom: 2.5rem;    /* Footer height */
// }
// #footer {
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   height: 2.5rem;            /* Footer height */
// }
