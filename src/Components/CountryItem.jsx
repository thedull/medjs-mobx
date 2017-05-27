import React, { Component, PropTypes } from 'react';
import mobx from 'mobx';

import request from '../Utils/Request';

import { countriesStore } from '../State/Countries';

const blank = require('../assets/blank1x1.png');

export default class CountryItem extends Component {
    static propTypes = {
        country: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        const country = mobx.toJS(this.props.country);
        console.log(country);
        this.viewDetails(country)
          .then((res) => {
              const results = res.geonames[0];
              console.log(results);
              countriesStore.selectedCountry = results;
          });
    }

    viewDetails = (country) => {
        console.log(mobx.toJS(country));
        const val = country.alpha2_code;
        console.log(`Should find ${val}`);
        return request(`http://api.geonames.org/countryInfoJSON?lang=en&country=${val}&username=thedull`);
    }

    render() {
        const { country } = this.props;
        return (
            <li className="list" role="menuitem" onClick={this.clickHandler}>
                <img src={blank} className={`flag flag-${country.alpha2_code.toLowerCase()}`} alt={country.name} />
                <div>{country.name}</div>
            </li>
        );
    }
}
