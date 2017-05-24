/**
 * Created by Min on 2017/2/9.
 */
import React, { Component } from 'react';
import mobx from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import request from '../Utils/Request';
import { countries } from '../State/Countries';

import '../Style/Countries';
import '../Style/flags';

export default class Countries extends Component {
    static handleKeyDown = (event) => {
        if (event.keyCode !== 13) return;
        event.preventDefault();

        const val = event.target.value.trim();

        if (val) {
            Countries.findCountries(val);
        }
    }

    static findCountries = (val) => {
        console.log(`Should find ${val}`);
        request(`http://services.groupkt.com/country/search?text=${val}`)
          .then((res) => {
              const results = res.RestResponse.result;
              console.log(results);
              countries.countryList = results;
          });
    }

    static viewDetails = (country) => {
        console.log(mobx.toJS(country));
        const val = country.alpha2_code;
        console.log(`Should find ${val}`);
        request(`http://api.geonames.org/countryInfoJSON?lang=es&country=${val}&username=thedull`)
          .then((res) => {
              const results = res.geonames[0];
              console.log(results);
              countries.selectedCountry = results;
          });
    }

    @observer
    render() {
        const { countryList, selectedCountry, totalCountries } = countries;
        let summary = null;
        if (!!countries && !!countries.totalCountries) {
            summary = <span>Countries found: {countries.totalCountries}</span>;
        }
        return (
            <div className="countries-container">
                <DevTools />
                <input placeholder="Search..." onKeyDown={Countries.handleKeyDown} autoFocus />
                <div className="countries-list">
                    <ul>
                    {
                        countryList.map((val, key) => (
                            <li className="list" key={val.alpha3_code}>
                                <img src="assets/flags.png" className={`flag flag-${val.alpha2_code}`} alt={val.name} />
                                <span onClick={() => Countries.viewDetails(val)}>{val.name}</span>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <div className="found">
                    {summary}
                </div>
                <div className="selected" >
                    <h2>{countries.selectedCountry.countryName}</h2>
                    <h4>{countries.selectedCountry.continentName}</h4>
                    <ul>
                        <li>Capital: {countries.selectedCountry.capital}</li>
                        <li>Population: {countries.selectedCountry.population}</li>
                        <li>Area (km^2): {countries.selectedCountry.areaInSqKm}</li>
                    </ul>
                </div>
            </div>
        );
    }
}
