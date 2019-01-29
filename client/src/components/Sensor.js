import React, { Component } from 'react';
import '../styles/Sensor.css';

class Sensor extends Component {
  render() {
    const { name, current, average15, average60 } = this.props;

    return (
      <div className="sensorContainer">
        <span className="sensorNameText">{`Sensor: ${name}`}</span>
        <div className="sensorDataContainer">
          <span className="sensorCurrentReading">{current}</span>
          <div className="sensorAveragesContainer">
            <div className="sensorAverageContainer">
              <span>Last 15 min</span>
              <span className="sensorAverageReading">{average15}</span>
            </div>
            <div className="sensorAverageContainer">
              <span>Last 60 min</span>
              <span className="sensorAverageReading">{average60}</span>
            </div>
          </div>
        </div>
        <span
          className="sensorHistoryLabel"
          onClick={this.props.onShowHistory}
        >
          Show History
        </span>
      </div>
    );
  } 
}

export default Sensor;
