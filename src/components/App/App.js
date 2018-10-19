import React, { Component } from 'react';
import Header from '../Header/Header';
import Items from '../Items/Items';
import Footer from '../Footer/Footer';
import '../../styles/style.scss';

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
