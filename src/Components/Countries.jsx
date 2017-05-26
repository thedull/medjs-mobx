/**
 * Created by Min on 2017/2/9.
 */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import request from '../Utils/Request';
import { countriesStore } from '../State/Countries';

import '../Style/Countries';

@observer
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
              countriesStore.countryList = results;
          });
    }

    render() {
        const { countryList } = countriesStore;
        return (
            <div className="countries-container">
                <input placeholder="Search..." autoFocus onKeyDown={Countries.handleKeyDown} />
                <div className="countries-list">
                    <ul>
                    {
                        countryList.map((val, key) => (
                            <li className="list" key={val.alpha3_code}>
                                <span>{val.name}</span>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <DevTools />
            </div>
        );
    }
}
