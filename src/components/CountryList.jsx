import "./countryList.css";

function CountryList({
  countryList,
  setCountryState,
  searchRef,
  serachResultRef,
}) {
  const continentList = countryList.reduce((itemList, country) => {
    if (!itemList[country.region]) {
      itemList[country.region] = [];
    }

    if (!itemList[country.region].includes(country.subregion)) {
      itemList[country.region].push(country.subregion);
    }
    return itemList;
  }, {});

  console.log(continentList);

  const filteredCountries = (filter) => {
    return countryList.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const coutrySelectedhandle = (country) => {
    const results = filteredCountries(country);

    if (results.length !== 0) {
      serachResultRef.current.style.display = "none";
      searchRef.current.value = results[0].name.common;
      setCountryState(results[0].name.common);
    } else {
      setCountryState("");
    }
  };

  return (
    <div className="continent-container">
      {Object.keys(continentList).map((continent) => {
        return (
          <div key={continent}>
            <h2>{continent}</h2>
            {continentList[continent].map((subContinent) => {
              return (
                <div key={subContinent} className="subcontinent-container">
                  <p>{subContinent}</p>
                  <div className="country-list-container">
                    {countryList.map((country, index) => {
                      if (country.subregion === subContinent) {
                        return (
                          <div
                            key={index}
                            className="country-item-container"
                            onClick={() =>
                              coutrySelectedhandle(country.name.common)
                            }
                          >
                            <p>{country.name.common}</p>
                            <img
                              className="flag-list-img"
                              src={country.flags.svg}
                              alt=""
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {/* {countryList.map((country, index) => {
        return (
          <div
            key={index}
            className="country-item-container"
            onClick={() => coutrySelectedhandle(country.name.common)}
          >
            <p>{country.name.common}</p>
            <img className="flag-list-img" src={country.flags.svg} alt="" />
          </div>
        );
      })} */}
    </div>
  );
}

export default CountryList;
