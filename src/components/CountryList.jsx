import "./countryList.css";

function CountryList({ countryList, setCountry, searchRef, serachResultRef }) {
  const filteredCountries = (filter) => {
    return countryList.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const continentList = countryList.reduce((itemList, country) => {
    const continent = country.region.toLowerCase();
    const subRegionName = !country.subregion ? "others" : country.subregion;
    let subRegion;
    if (!country.subregion) {
      subRegion = "others";
    } else {
      subRegion = country.subregion.toLowerCase().replaceAll(" ", "_");
    }

    if (!itemList[continent]) {
      itemList[continent] = { region: country.region };
    }

    if (!itemList[continent][subRegion]) {
      itemList[continent][subRegion] = {
        countries: [],
        subregion: subRegionName,
      };
    }

    itemList[continent][subRegion].countries.push(country);

    return itemList;
  }, {});

  const coutrySelectedhandle = (country) => {
    const results = filteredCountries(country);

    if (results.length !== 0) {
      serachResultRef.current.style.display = "none";
      searchRef.current.value = results[0].name.common;
      setCountry(results[0].name.common);
    } else {
      setCountry("");
    }
  };

  return (
    <div className="continent-main-container">
      {Object.keys(continentList).map((continent) => {
        return (
          <div key={continent} className="continent-container">
            <h2>{continentList[continent].region}</h2>
            {Object.keys(continentList[continent]).map((subContinent) => {
              return subContinent !== "region" ? (
                <div key={subContinent} className="subcontinent-container">
                  <h3>{continentList[continent][subContinent].subregion}</h3>
                  <div className="country-list-container">
                    {continentList[continent][subContinent].countries.map(
                      (country, index) => {
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
                    )}
                  </div>
                </div>
              ) : null;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CountryList;
