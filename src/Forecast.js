import React, { Component } from 'react';

class Forecast extends Component {
  render() {
    var weatherID, weatherIcon, date, temp;

    date = new Date(this.props.data.dt * 1000);
    date = date.toDateString();
    date = date.substring(0,4);

    weatherID = this.props.data.weather[0].id;
    weatherIcon = "wi wi-owm-" + weatherID;

    temp = Math.round(this.props.data.temp.day);

  return (
    <tr>
      <td>{date}</td>
      <td><i className={weatherIcon}></i></td>
      <td>{temp}&deg;</td>
    </tr>
  );
  }
}

export default Forecast;
