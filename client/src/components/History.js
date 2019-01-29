import React, { Component } from 'react';
import '../styles/History.css';

class History extends Component {
  render() {
    const { sensor, data } = this.props;

    return (
      <div className="historyContainer">
        <span className="historyHeaderText">History readings</span>
        <span className="historyHeaderText">{`Sensor: ${sensor}`}</span>
        <span className="historyHeaderText">Last 50 readings</span>
        {data && data.length > 0 && this.renderData(data)}
      </div>
    );
  }

  renderData = (data) => {
    return (
      <div className="dataContainer">
        {
          data.map((reading, index) => {
            return (
              <div key={`${reading}-${index}`} className="readingContainer">
                <span className="readingText">{`Reading #${index}: `}</span>
                <span className="readingText">{reading}</span>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default History;
