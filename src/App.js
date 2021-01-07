import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid/Grid';
import Pathvisualizer from './Pathvizualizer/Pathvisualizer';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Pathvisualizer />
      </div>
    );
  }
}
export default App;
