import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

@observer
export default class CountriesSummary extends Component {
    static propTypes = {
        totalCountries: PropTypes.number.isRequired,
    };

    render() {
        const { totalCountries } = this.props;
        return (
            <div>
                { !!totalCountries &&
                    <div className="found">
                        <span>Countries found: {totalCountries}</span>
                    </div>
                }
            </div>
        );
    }
}
