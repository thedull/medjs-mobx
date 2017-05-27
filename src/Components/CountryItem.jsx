import React, { Component, PropTypes } from 'react';

const blank = require('../assets/blank1x1.png');

export default class CountryItem extends Component {
    static propTypes = {
        country: PropTypes.object.isRequired,
        key: PropTypes.object.isRequired,
    };

    render() {
        const { country, key } = this.props;
        return (
            <li className="list" key={key}>
                <img src={blank} className={`flag flag-${country.alpha2_code.toLowerCase()}`} alt={country.name} />
                <div>{country.name}</div>
            </li>
        );
    }
}
