import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

const NumberFormat = require('react-number-format');

const blank = require('../assets/blank1x1.png');

@observer
export default class CountryDetail extends Component {
    static propTypes = {
        selectedCountry: PropTypes.object.isRequired,
    };

    render() {
        const { selectedCountry } = this.props;
        const mapSrc = !!selectedCountry.countryName &&
            `https://maps.googleapis.com/maps/api/staticmap?center=${selectedCountry.countryName.replace(' ', '+')}&zoom=3&scale=false&size=250x250&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${selectedCountry.countryName.replace(' ', '+')}`;
        console.log(selectedCountry);
        return (
            <div>
                {
                    !!selectedCountry.countryName &&
                    <div className="selected" >
                        <div className="map">
                            <img src={mapSrc} alt={`${selectedCountry.countryName}-map`} />
                        </div>
                        <div className="details">
                            <div className="countryHeaderContainer">
                                <img src={blank} className={`flag flag-${selectedCountry.countryCode.toLowerCase()}`} alt={selectedCountry.countryName} />
                                <span className="countryHeader">{selectedCountry.countryName}</span>
                            </div>
                            <ul>
                                <li>
                                    <span className="fieldName">Continent:</span>
                                    {selectedCountry.continentName}
                                </li>
                                <li>
                                    <span className="fieldName">Capital:</span>
                                    {selectedCountry.capital}
                                </li>
                                <li>
                                    <span className="fieldName">Population:</span>
                                    <NumberFormat value={selectedCountry.population} displayType={'text'} thousandSeparator />
                                </li>
                                <li>
                                    <span className="fieldName">Area (km^2):</span>
                                    <NumberFormat value={selectedCountry.areaInSqKm} displayType={'text'} thousandSeparator />
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
