import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Sensor from './Sensor';
import History from './History';
import '../styles/App.css';

const TEMP_SENSOR = 'Temperature';
const CO2_SENSOR = 'CO2';
const AC_SENSOR = 'AC';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: openSocket('http://localhost:1337'),
      acSensor: {
        values: [],
        frequency: 1,
        average15: 0,
        average60: 0
      },
      co2Sensor: {
        values: [],
        frequency: 60,
        average15: 0,
        average60: 0
      },
      tempSensor: {
        values: [],
        frequency: 10,
        average15: 0,
        average60: 0
      },
      showHistory: null
    };

    this.state.socket.on(AC_SENSOR, this.acHandler);
    this.state.socket.on(CO2_SENSOR, this.co2Handler);
    this.state.socket.on(TEMP_SENSOR, this.tempHandler);
  }

  render() {
    const { acSensor, co2Sensor, tempSensor } = this.state;

    return (
      <div className="App">
        <div className="sensorsContainer">
          <Sensor
            name={AC_SENSOR}
            current={acSensor.values[0]}
            average15={acSensor.average15}
            average60={acSensor.average60}
            onShowHistory={() => this.setHistoryState(AC_SENSOR)}
          />
          <Sensor
            name={CO2_SENSOR}
            current={co2Sensor.values[0]}
            average15={co2Sensor.average15}
            average60={co2Sensor.average60}
            onShowHistory={() => this.setHistoryState(CO2_SENSOR)}
          />
          <Sensor
            name={TEMP_SENSOR}
            current={tempSensor.values[0]}
            average15={tempSensor.average15}
            average60={tempSensor.average60}
            onShowHistory={() => this.setHistoryState(TEMP_SENSOR)}
          />
        </div>
        {this.state.showHistory && (
          <History
            sensor={this.state.showHistory}
            data={this.getHistoryData()}
          />
        )}
      </div>
    );
  }

  setHistoryState = (sensor) => {
    let showHistory = null;

    if ([AC_SENSOR, CO2_SENSOR, TEMP_SENSOR].indexOf(sensor) > -1) {
      showHistory = sensor;
    }

    this.setState({
      ...this.state,
      showHistory
    });
  }

  getHistoryData = () => {
    const { showHistory, tempSensor, acSensor, co2Sensor } = this.state;
    const data = showHistory
      ? showHistory === TEMP_SENSOR
        ? tempSensor.values
        : showHistory === CO2_SENSOR
         ? co2Sensor.values
         : acSensor.values
      : [];
    
    return data.slice(0, 51);
  }

  acHandler = (ac) => {
    const { acSensor } = this.state;

    const values = [ac, ...acSensor.values];
    
    // Should be * 60 to represent 15 min (right now 15s)
    const size15 = 15 / acSensor.frequency;
    const average15 = values.length > size15
      ? this.arrayAverage(values.slice(0, size15 + 1))
      : this.arrayAverage(values);

    // Should be * 60 to represent 60 min (right now 60s)
    const size60 = 60 / acSensor.frequency;
    const average60 = values.length > size60
      ? this.arrayAverage(values.slice(0, size60 + 1))
      : this.arrayAverage(values);

    this.setState({
      ...this.state,
      acSensor: {
        ...acSensor,
        values,
        average15,
        average60
      }
    });
  }

  co2Handler = (co2) => {
    const { co2Sensor } = this.state;

    const values = [co2, ...co2Sensor.values];

    // Should be * 60 to represent 15 min (right now 15s)
    const size15 = 15 / co2Sensor.frequency;
    const average15 = values.length > size15
      ? this.arrayAverage(values.slice(0, size15 + 1))
      : this.arrayAverage(values);

    // Should be * 60 to represent 60 min (right now 60s)
    const size60 = 60 / co2Sensor.frequency;
    const average60 = values.length > size60
      ? this.arrayAverage(values.slice(0, size60 + 1))
      : this.arrayAverage(values);

    this.setState({
      ...this.state,
      co2Sensor: {
        ...co2Sensor,
        values,
        average15,
        average60
      }
    });
  }

  tempHandler = (temp) => {
    const { tempSensor } = this.state;

    const values = [temp, ...tempSensor.values];

    // Should be * 60 to represent 15 min (right now 15s)
    const size15 = 15 / tempSensor.frequency;
    const average15 = values.length > size15
      ? this.arrayAverage(values.slice(0, size15 + 1))
      : this.arrayAverage(values);

    // Should be * 60 to represent 60 min (right now 60s)
    const size60 = 60 / tempSensor.frequency;
    const average60 = values.length > size60
      ? this.arrayAverage(values.slice(0, size60 + 1))
      : this.arrayAverage(values);

    this.setState({
      ...this.state,
      tempSensor: {
        ...tempSensor,
        values,
        average15,
        average60
      }
    });
  }

  arrayAverage = (array) => {
    const sum = (array || []).reduce((current, sum) => {
      return sum+= current;
    }, 0);
    return Math.floor(sum / array.length) || 0;
  }
}

export default App;
