import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./components/loading.css";

import Header from "./components/Header";
import Country from "./components/Country";
import CountryList from "./components/CountryList";

import * as countriesServices from "./services/countries";

function App() {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState("");

  const searchRef = useRef(null);
  const serachResultRef = useRef(null);

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
          setCountry={setCountry}
          searchRef={searchRef}
          serachResultRef={serachResultRef}
        />
      );
    }
  }

  return (
    <div className="app-container">
      <Header
        countries={countries}
        setCountry={setCountry}
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
