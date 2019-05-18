import React, { Component } from 'react';
import './App.css';
import subscribeToTimer from './api';

/*

The subscribeToTimer function from api is called in the constructor with the setTimestamp fn.
In the api, socket first subscribes to the timer event with the action function. 
So everytime server emits a timer event, the action function is triggered whose job is to set the received timestamp in the state.

*/

class App extends Component {

  constructor(props){
    super(props);
    subscribeToTimer(this.setTimestamp);
    this.state = {
      timestamp: "No Timestamp yet"
    }
  }

  setTimestamp = (timestamp) => {
    this.setState({
      timestamp
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Our awesome drawing app</h2>
        </div>
        This is the value of the timer timestamp: {this.state.timestamp}
      </div>
    );
  }
}

export default App;
