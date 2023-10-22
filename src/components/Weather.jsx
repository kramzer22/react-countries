import { useState, useEffect } from "react";

import "./weather.css";
import "./loading.css";
import * as weatherServices from "../services/weather";

function Weather({ capitalName }) {
  const [weather, setWeather] = useState(null);

  const getCapitalWeather = async () => {
    try {
      const response = await weatherServices.getWeather(capitalName);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCapitalWeather();
  }, []);

  if (!weather) {
    return (
      <div className="loading-container">
        <p>Loading Weather</p>
        <div className="pulsing-circle"></div>
      </div>
    );
  }

  const dateTimeGMT = new Date();
  dateTimeGMT.setHours(
    dateTimeGMT.getHours() + parseInt(weather.timezone) / 3600
  );

  return (
    <div className="weather-container">
      <h2>Weather in {weather.name}</h2>
      <p className="time-now">DateTime: {dateTimeGMT.toUTCString()}</p>
      <div className="weather-container-one">
        <div className="temp-container">
          <h4>Temparature</h4>
          <p className="temp">
            {(parseFloat(weather.main.temp) - 273.15).toFixed(2)}°C
          </p>
          <p className="min-temp">
            min:{(parseFloat(weather.main.temp_min) - 273.15).toFixed(2)}°C
          </p>
          <p className="max-temp">
            max:{(parseFloat(weather.main.temp_max) - 273.15).toFixed(2)}°C
          </p>
        </div>
        <div className="cloud-container">
          <img
            className="weather-icon-img"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="image of weather"
          />
          <p>{weather.weather[0].description}</p>
        </div>
      </div>

      <p className="wind-speed">wind speed: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;
