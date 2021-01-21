import React, { Component } from 'react';
import './App.css';
import AnimatedCursor from './Animation/AnimatedCursor';
import Pathvisualizer from './Pathvizualizer/Pathvisualizer';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Pathvisualizer />
         <AnimatedCursor />
      </div>
    );
  }
}
export default App;
