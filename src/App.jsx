import { useState, useRef } from "react";
import "./App.css";
import "./components/loading.css";

import Search from "./components/Search";
import Country from "./components/Country";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState("");

  const searchRef = useRef(null);
  const serachResultRef = useRef(null);

  let display;
  if (country !== "") {
    display = <Country countryName={country} />;
  } else {
    if (!countries) {
      display = (
        <div className="loading-container max-height">
          <p>Loading Countries</p>
          <div className="pulsing-circle" />
        </div>
      );
    } else {
      display = (
        <CountryList
          countryList={countries}
          setCountryState={setCountry}
          searchRef={searchRef}
          serachResultRef={serachResultRef}
        />
      );
    }
  }

  return (
    <div className="app-container">
      <Search
        setCountryState={setCountry}
        countries={countries}
        setCountries={setCountries}
        searchRef={searchRef}
        serachResultRef={serachResultRef}
      />
      {display}

      <div className="copyrights-container">
        <p>© 2023. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
