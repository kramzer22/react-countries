import axios from "axios";

export const getWeather = (city) => {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
    import.meta.env.VITE_WEATHER_KEY
  }`;
  return axios.get(apiURL);
};

export default getWeather;
