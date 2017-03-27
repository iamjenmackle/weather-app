import React, { Component } from 'react';
import xhr from 'xhr';
import './css/App.css';
import Menu from './Menu.js';
import Forecast from './Forecast.js';


class App extends Component {

  state = {
      location: 2950157,
      data: {}
  };

  fetchData = () => {
      var location = this.state.location;
      var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=';
      var urlSuffix = '&APPID=9244945f673887f74fded07b1857e368&units=metric&cnt=5';
      var url = urlPrefix + location + urlSuffix;

      var self = this;

      xhr({
          url: url,
      }, function (err, data) {
            var body = JSON.parse(data.body);
            self.setState({
                data: body,
            });

      });

      console.log('fetch data for', this.state.location, this.state.data);
  };

  changeLocation = (eventKey) => {
    this.setState({
        location: eventKey
    }) ;

  };

  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchData, 100 * 600);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.location !== this.state.location) {
    this.fetchData();
    }
  }

  calcWind = (windDir) => {
     var index = Math.round(windDir/45);
     var wind = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
     for(var i = 0; i < wind.length; i++)
    {
        if(index === i)
        {
            return wind[i];
        }
    }
  }

  render() {
    var city, current, currentTemp, tempMin, tempMax, description,
    windDir, windSpeed, clouds, pressure, forecast;

    if(this.state.data.list) {
        city = this.state.data.city.name;

        current = this.state.data.list[0];
        currentTemp = Math.round(current.temp.day);
        tempMin = Math.round(current.temp.min);
        tempMax = Math.round(current.temp.max);
        description = current.weather[0].description;
        windDir = this.calcWind(current.deg);
        windSpeed = Math.round(current.speed);
        clouds = current.clouds;
        pressure = Math.round(current.pressure);
        forecast = this.state.data.list.map((day, i) => <Forecast key={i} data={day} />)
    }

    return (
    <div className="wrapper">
      <h1>{city}</h1>
      <Menu location={city} onSelect={this.changeLocation} />
      <div className="mainData-wrapper">
          <span className="currentTemp">{currentTemp}&deg;</span>
          <span className="data"><i className="wi wi-direction-up"></i> {tempMax}&deg;</span>
          <span className="data"><i className="wi wi-direction-down"></i> {tempMin}&deg;</span>
          <span className="desc">{description}</span>
          <span className="data"><i className="wi wi-strong-wind"></i> {windDir} {windSpeed} m/s</span>
          <span className="data"><i className="wi wi-cloud"></i> {clouds} %</span>
          <span className="data"><i className="wi wi-barometer"></i> {pressure} hpa</span>
      </div>
      <br/>
      <div className="forecastData-wrapper">
      <h2>Forecast</h2>
      <table>
        <tbody>
          {forecast}
        </tbody>
      </table>
      </div>
      <br/>
     </div>
    );
  }
}

export default App;
