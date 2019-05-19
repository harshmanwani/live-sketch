import React, { Component } from 'react';
import './App.css';
import DrawingForm from './DrawingForm';
import DrawingList from './DrawingList';
import { Drawing } from './Drawing';
// import subscribeToTimer from './api';

/*

The subscribeToTimer function from api is called in the constructor with the setTimestamp fn.
In the api, socket first subscribes to the timer event with the action function. 
So everytime server emits a timer event, the action function is triggered whose job is to set the received timestamp in the state.

*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedDrawing: ''
    }
  }

  selectDrawing = (selectedDrawing) => {
    this.setState({
      selectedDrawing
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Our awesome drawing app</h2>
        </div>

        {
          this.state.selectedDrawing
          ? <Drawing 
              drawing={this.state.selectedDrawing}
              key={this.state.selectedDrawing.id}
          />
          : <div>
              <DrawingForm/>
              <DrawingList
                selectDrawing={this.selectDrawing}
              />
          </div>
        }


      </div>
    );
  }
}

export default App;
