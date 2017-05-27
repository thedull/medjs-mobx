import React, { Component, PropTypes } from 'react';

const blank = require('../assets/blank1x1.png');

export default class CountryItem extends Component {
    static propTypes = {
        country: PropTypes.object.isRequired,
    };

    render() {
        const { country } = this.props;
        return (
            <li className="list">
                <img src={blank} className={`flag flag-${country.alpha2_code.toLowerCase()}`} alt={country.name} />
                <div>{country.name}</div>
            </li>
        );
    }
}
