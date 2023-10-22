import { useState, useEffect, useRef } from "react";

import "./search.css";
import * as countriesServices from "../services/countries";

function Search({
  setCountryState,
  countries,
  setCountries,
  searchRef,
  serachResultRef,
}) {
  const [searchFilter, setSearchFilter] = useState("");
  const searchLabel = useRef(null);

  const filteredCountries = (filter) => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const getAllCountries = async () => {
    try {
      const response = await countriesServices.getAll();
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const searchCountriesHandle = (e) => {
    if (searchRef.current.value.length === 0) {
      serachResultRef.current.style.display = "none";
    } else if (countries.length !== 0) {
      serachResultRef.current.style.display = "flex";
      setSearchFilter(searchRef.current.value);
    }

    const results = filteredCountries(searchRef.current.value);
    if (results.length === 1) {
      serachResultRef.current.style.display = "none";
      setCountryState(results[0].name.common);
    } else if (results.length === 0) {
      setCountryState("");
      serachResultRef.current.style.display = "none";
    } else {
      setCountryState("");
    }
  };

  const coutrySelectedhandle = (e) => {
    serachResultRef.current.style.display = "none";
    searchRef.current.value = e.target.textContent;
    setSearchFilter(e.target.textContent);

    const results = filteredCountries(e.target.textContent);

    if (results.length !== 0) {
      setCountryState(results[0].name.common);
    } else {
      setCountryState("");
    }
  };

  const showLabel = () => {
    searchLabel.current.style.display = "block";
  };

  const hideLabel = () => {
    searchLabel.current.style.display = "none";
  };

  let listDisplay;

  const setListDisplay = () => {
    if (searchFilter != "") {
      const results = filteredCountries(searchFilter);
      if (results.length > 6) {
        listDisplay = <p>Too many matches, specify another filter.</p>;
      } else {
        listDisplay = results.map((country, index) => {
          return (
            <li
              className="search-item"
              key={index}
              onClick={coutrySelectedhandle}
            >
              <img src={country.flags.svg} alt="flag image" />
              <p>{country.name.common}</p>
            </li>
          );
        });
      }
    } else {
      listDisplay = <></>;
    }
  };

  setListDisplay();

  return (
    <div className="search-container">
      <p ref={searchLabel}>Find Countries: </p>
      <div className="search-input-container">
        <input
          ref={searchRef}
          type="text"
          placeholder="search countries"
          onChange={searchCountriesHandle}
          onFocus={hideLabel}
          onBlur={showLabel}
        />
        <ul ref={serachResultRef} className="search-result-container">
          {listDisplay}
        </ul>
      </div>
    </div>
  );
}

export default Search;
