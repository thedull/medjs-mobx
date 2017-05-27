import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import CountryItem from '../Components/CountryItem';

@observer
export default class CountriesListView extends Component {
    static propTypes = {
        countryList: PropTypes.object.isRequired,
    };

    render() {
        const { countryList } = this.props;
        return (
            <div className="countries-list">
                <ul>
                    {
                        countryList.map(country => <CountryItem country={country} key={country.alpha3_code} />)
                    }
                </ul>
            </div>
        );
    }
}
