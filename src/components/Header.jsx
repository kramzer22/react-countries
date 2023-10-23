import { useState, useRef } from "react";

import "./header.css";
import menu from "../assets/bars-solid.svg";

export function Menu() {
  return (
    <div className="menu-container">
      <img className="menu-img" src={menu} alt="menu image" />
    </div>
  );
}

export function Header({ countries, setCountry, searchRef, serachResultRef }) {
  return (
    <div className="header-container">
      <Search
        countries={countries}
        setCountry={setCountry}
        searchRef={searchRef}
        serachResultRef={serachResultRef}
      />
      <Menu />
    </div>
  );
}

function Search({ countries, setCountry, searchRef, serachResultRef }) {
  const [searchFilter, setSearchFilter] = useState("");
  const searchLabel = useRef(null);

  const filteredCountries = (filter) => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const searchCountries = () => {
    if (countries) {
      if (searchRef.current.value.length === 0) {
        serachResultRef.current.style.display = "none";
      } else if (countries.length !== 0) {
        serachResultRef.current.style.display = "flex";
        setSearchFilter(searchRef.current.value);
      }

      const results = filteredCountries(searchRef.current.value);
      if (results.length === 1) {
        serachResultRef.current.style.display = "none";
        setCountry(results[0].name.common);
      } else if (results.length === 0) {
        setCountry("");
        serachResultRef.current.style.display = "none";
      } else {
        setCountry("");
      }
    }
  };

  const selectCountry = (countryName) => {
    serachResultRef.current.style.display = "none";
    searchRef.current.value = countryName;
    setSearchFilter(countryName);

    const results = filteredCountries(countryName);

    if (results.length !== 0) {
      setCountry(results[0].name.common);
    } else {
      setCountry("");
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
              onClick={() => selectCountry(country.name.common)}
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
    <>
      <p ref={searchLabel}>Find Countries: </p>
      <div className="search-input-container">
        <input
          ref={searchRef}
          type="text"
          placeholder="search countries"
          onChange={searchCountries}
          onFocus={hideLabel}
          onBlur={showLabel}
        />
        <ul ref={serachResultRef} className="search-result-container">
          {listDisplay}
        </ul>
      </div>
    </>
  );
}

export default Header;
