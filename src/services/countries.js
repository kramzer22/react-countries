import axios from "axios";
const allURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const selectedURL = "https://studies.cs.helsinki.fi/restcountries/api/name/";

export function getAll() {
  return axios.get(allURL);
}

export function getSelected(country) {
  return axios.get(selectedURL + country.replace(" ", "%20"));
}
