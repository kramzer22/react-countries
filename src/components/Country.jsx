import { useState, useEffect } from "react";

import "./country.css";
import "./loading.css";
import * as countriesServices from "../services/countries";

import Weather from "./Weather";

function Country({ countryName }) {
  const [country, setCountry] = useState(null);

  const getSelectedCountry = async () => {
    try {
      const response = await countriesServices.getSelected(countryName);
      setCountry(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSelectedCountry();
  }, []);

  if (!country) {
    return (
      <div className="loading-container max-height">
        <div className="pulsing-circle"></div>
      </div>
    );
  }
  console.log(country);

  const capital = country.hasOwnProperty("capital")
    ? country.capital
    : [country.name.common];

  const languagesCount = !country.languages
    ? 0
    : Object.keys(country.languages).reduce((count, item) => (count += 1), 0);
  const languageClassName =
    languagesCount > 1 ? "grid-language-container" : "flex-language-container";

  return (
    <div className="country-container">
      <img
        className="country-flag"
        src={country.flags.svg}
        alt="image of flag"
      />
      <div>
        <h1 className="country-name">{country.name.common}</h1>
        <p className="official-name">{country.name.official}</p>
        <p>Region: {country.region}</p>
        <p>Subregion: {!country.subregion ? "none" : country.subregion}</p>
        <p>Capital: {capital.join(", ")}</p>
        <p>Area: {country.area.toLocaleString()}</p>
        <p>Population: {country.population.toLocaleString()}</p>
      </div>

      <div>
        <h2>Languages</h2>
        <ul className={languageClassName}>
          {!country.languages ? (
            <li>none</li>
          ) : (
            Object.keys(country.languages).map((item) => {
              return <li key={item}>{country.languages[item]}</li>;
            })
          )}
        </ul>
      </div>

      {capital.map((capital, index) => (
        <Weather key={index} capitalName={capital} />
      ))}
    </div>
  );
}

export default Country;
