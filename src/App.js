import React, { Component } from 'react';
import Header from './components/Header';
import Items from './components/Items';
import Footer from './components/Footer';
import './styles/style.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Items/>
        <Footer/>
      </div>
    );
  }
}

export default App;
