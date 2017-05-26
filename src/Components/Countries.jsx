/**
 * Created by Min on 2017/2/9.
 */
import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';

// import '../Style/Intro';

export default class Countries extends Component {
    render() {
        return (
            <div className="countries-container">
                <p>Countries will appear here</p>
                <DevTools />
            </div>
        );
    }
}
