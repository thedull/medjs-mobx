# MobX with React workshop

## Setup

For this workshop We can use any Unix-like environment. In order to avoid some side effects with packages and versioning, we will use a cloud sandbox, like the ones provided by Cloud9 (www.c9.io) or Codeanywhere (www.codeanywhere.com).

1) Either
    - Create a new empty container in codeanywhere.
    - Create a new HTML5 workspace in Cloud 9.
    - Or use your own Unix-like environment (discouraged).

2) Add nvm
    ```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
    ```
3) Install node 7
    ```
    nvm install 7
    ```
4) Add yarn
    ```
    curl -o- -L https://yarnpkg.com/install.sh | bash
    ```
5) Install yeoman
    ```
    yarn add global yo
    ```
    Or with npm, if Yarn has issues:
    ```
    npm i -g yo
    ```
6) Add react-webpack-mobx generator globally
    ```
    yarn add global generator-react-webpack-mobx
    ```
    Or with npm:
    ```
    npm i -g generator-react-webpack-mobx
    ```
7) Create new app via Yeoman
    ```
    yo react-webpack-mobx <ProjectName>
    ```
8) In order to make webpack-dev-server work with Codeanywhere or Cloud9, we need to:
    - Cloud 9:
        - Update webpack.config.js
            ```
            ...
            HOST: process.env.HOST,     // was "0.0.0.0"
            PORT: process.env.PORT,     // was "4040"
            ...
            devServer: {
                ...
                open: false,
                disableHostCheck: true
            }
            ...
            output: {
                ...
                publicPath: `<public-uri-of-your-C9-workspace>:${PORT}/`
            }
        - Update package.json:
            ```
            ...
            "scripts": {
                "dev": "cross-env NODE_ENV=development webpack-dev-server --host $IP --port $PORT",
                ...
            }
            ```
    - Codeanywhere:
        - Update webpack.config.js
            ```
            ...
            devServer: {
                ...
                open: false,
                disableHostCheck: true
            }
            ...
            output: {
                ...
                publicPath: `<public-uri-of-your-CA-container>:${PORT}/`
            }
    - Local environments would not need to do anything here.
9) Add mobx-react-devtools via yarn
    ```
    yarn add mobx-react-devtools
    ```
10) In src/Components/Todo.jsx add DevTools to imports and place tag anywhere inside render method
11) Run `yarn dev`, wait for the build, and open the app in your browser.
    - **Codeanywhere**: http://public-uri-of-your-CA-container:4040
    - **Cloud 9**: http://public-uri-of-your-C9-workspace:8080
    - **Local environment**: http://0.0.0.0:4040

    Validate DevTools are working as intended

12) In src/Components/Main.jsx add new link to countries
13) In src/Router/Index.jsx add countries to chunks import and new route path for countries
14) In src/Router/Chunks add export for countries. You can duplicate todo's export and change accordingly
15) Create new Countries component in src/Components. Duplicate Intro.jsx and rename to Countries.jsx
16) In newly created Countries component:
    - Comment out syle import
    - Change class name to Countries
    - Inside div change the className attribute to `countries-container`
    - Change the inner HTML inside the div for a dummy text like *"Countries will appear here"*
    - Import DevTools as usual and add it inside the div
17) Ensure everything is working OK for new Countries page, including DevTools
18) In src/Components/Countries.jsx change dummy text and add an input with placeholder "Search..." and autofocus attribute
19) Create new SASS style sheet for Countries in src/Style
20) Inside the newly created file, add the desired style for `countries-container` and the corresponding nested input tag (you can base on the styles in Todo.scss or design your own)
21) In src/Components/Countries.jsx uncomment the style import and change it to "Style/Countries"
22) Add a handler for the onKeyDown event of the input and name it `handleKeyDown`
23) Inside the Countries component create the `handleKeyDown` static function, as shown:
    ```
    static handleKeyDown = (event) => {
        if (event.keyCode !== 13) return;
        event.preventDefault();

        const val = event.target.value.trim();

        if (val) {
            console.log(`Should find ${val}`);
        }
    }
    ```
    This allows us to get the input's text when the user types ENTER key, and logs it into the console
24) Validate everything is working as intended
25) Create another static function called `findCountries`, invoke it from the key down handler and move the console.log into it
26) Inside this function we'll implement the call to the countries API in order to search by name. We will use the request utility in Utils/Request.jsx for this:
    ```
    ...
    import request from '../Utils/Request';
    ...
    static findCountries = (val) => {
        console.log(`Should find ${val}`);
        request(`http://services.groupkt.com/country/search?text=${val}`)
          .then((res) => { console.log(res); });
    }
    ```
27) After validating and inspecting the logged response, we discover that the array of countries we require lies inside `RestResponse.result`; so, the success callback must be rewritten
    ```
        ...
          .then((res) => {
              const results = res.RestResponse.result;
              console.log(results);
          });
    ```
28) Create a new Countries store in src/State by means of dupicating src/State/Index.jsx and implementing similarly:
    ```
    import { observable } from 'mobx';

    class CountriesStore {
        @observable countryList = [];
    }

    export const countriesStore = new CountriesStore();
    ```
29) Back into the Countries component, we need to import the new store and assign the fetched result into findCountries
    ```
    ...
    import { countries } from '../State/Countries';
    ...
        static findCountries = (val) => {
        ...
          .then((res) => {
              const results = res.RestResponse.result;
              console.log(results);
              countries.countryList = results;
          });
    }
    ```
30) We also need to have the store reference inside the component's render function, just the way it's in the Todos component:
    ```
    ...
    render() {
        const { countryList } = countriesStore;
        return (
        ...
    ```
31) Now it's time to display the countries; so, we'll create the div for the results and a list *à la* React
    ```
    render() {
        ...
        return (
            <div className="countries-container">
            ...
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
32) But after building and running, nothing special happens. We need MobX to do its magic by means of adding an `@observer` decorator before the component's declaration, and of course importing it from mobx-react library
    ```
    ...
    import { observer } from 'mobx-react';
    ...
    @observer
    export default class Countries extends Component {
    ...
    ```
33) Let's add some cool styling to our countries list.

    First, we will go to https://www.flag-sprites.com/ This resource provides an elegant way to show the corresponding flag with just its ISO alpha-2 code (which we fortunately have in the API response).

    After following a couple of easy steps we'll be able to download a zipped folder which contains a PNG image with all the flags and two stylesheets whose only difference is that one of them is the minified copy of the other.
34) Create a new folder inside src called *assets* and upload flags.png into it
35) Upload flags.css to src/Style and add these properties to the flag class rule:
    ```
    .flag {
        ...
        background: url('../assets/flags.png') no-repeat;
        background-position: -1000px -1000px;
        float: left;
        margin-top: 3px;
        margin-right: 10px;
    }
    ```
    Also make sure of changing this file's extension to *.scss*, in order to make it able to be processed by webpack-dev-server without further configuration
36) In src/Style/Countries.scss add the following rules inside `countries-container`:
    ```
    .countries-list {
        ul {
            list-style-type: none;
        }
        li {
            text-align: left;
            float: left;
            margin: 2px;
            border: 1px solid #abc;
            width: 250px;
            height: 40px;
            vertical-align: middle;
            padding: 5px;
            cursor: pointer;
            &:hover {
                background-color: #abc;
            }
            div {
              height: 40px;
              vertical-align: middle;
              display: table-cell;
            }
        }
    }
    ```
37) In Countries component update the template for each country and add the flags stylesheet import:
    ```
    ...
    import '../Style/flags';
    ...
        <li className="list" key={val.alpha3_code}>
            <img src={blank} className={`flag flag-${val.alpha2_code.toLowerCase()}`} alt={val.name} />
            <div>{val.name}</div>
        </li>
    ```
38) You might have noticed the `{blank}` in the src attibute. According to the flag-sprites.com instructions, this should correspond to a 1x1 transparent pixel image. Thankfully, http://www.1x1px.me/ got us covered; just pick any color (I preferred 'FFF'), set 0 as the opacity, download the PNG file, and upload it into src/assets as *blank1x1.png*.

    After that, import the image in the Countries component below the flags stylesheet import:
    ```
    const blank = require('../assets/blank1x1.png');
    ```
39) You should now be getting this error:
    ```
    ERROR in ./src/assets/flags.png
    Module parse failed: /home/ubuntu/workspace/testApp01/src/assets/flags.png
    Unexpected character '�' (1:0)
    You may need an appropriate loader to handle this file type.
    ```
    It means exactly what's suggested in the last line. We need to add an image handler to our webpack-dev-server. This will help us through:
    * Run `yarn add image-webpack-loader file-loader -D` to add the corresponding handlers.
    * In webpack.config.js add a new module rule:
        ```
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    query: {
                                        name:'assets/[name].[ext]'
                                    }
                                }
                            },
                            {
                                loader: 'image-webpack-loader',
                                options: {
                                    query: {
                                        mozjpeg: {
                                            progressive: true,
                                        },
                                        gifsicle: {
                                            interlaced: true,
                                        },
                                        optipng: {
                                            optimizationLevel: 7,
                                        }
                                    }
                                }
                            }
                    ]
                }
        ```
    And after compiling we'll automatically get a sweet styling for our countries master view
40) However -as stated in https://mobx.js.org/best/react-performance.html -, in order to get the best performance from our React app, we need to create dedicated stateless components for the view and its corresponding entries.

    Based on src/Components/Intro create two new files:
    * src/Components/CountriesListView.jsx
    * src/Components/CountryItem.jsx
41) In src/Components/CountriesListView.jsx:
    - Remove the stylesheet reference
    - Cut the div whose className is `countries-list` from the Countries component, and paste it in the render function of the CountriesListView component.
    - Decorate the component with `@observer` and import the decorator correspondingly.
    - Immediatly after the render function declaration, add the reference to the observable countryList property.
        ```
        const { countryList } = this.props;
        ```
    - Add the corresponding typechecking on the props as a static method inside the class, as shown:
        ```
        static propTypes = {
            countryList: PropTypes.object.isRequired,
        };
        ```
        Don't forget to import the reference to PropTypes from `react` library at the topmost
    - And finally, cut everything inside the `<li>` tags and put this instead:
        ```
        countryList.map(country => <CountryItem country={country} key={country.alpha3_code} />)
        ```
        Also remember to add the reference to the newly created CountryItem component.
42) In src/Components/CountryItem.jsx:
    - Paste the cut `li` contents inside the render function
        ```
        <li className="list">
            <img src={blank} className={`flag flag-${country.alpha2_code.toLowerCase()}`} alt={country.name} />
            <div>{country.name}</div>
        </li>
        ```
    - Remove the stylesheet reference
    - Immediatly after the render function declaration, add the reference to the corresponding reactive props.
        ```
        const { country } = this.props;
        ```
    - Add the corresponding typechecking on the props as a static method inside the class, as shown:
        ```
        static propTypes = {
            country: PropTypes.object.isRequired,
        };
        ```
        Don't forget to import the reference to PropTypes from `react` library at the topmost
    - Also cut and paste the declaration and requiring for the blank image.
43) In src/Components/Countries.jsx use the CountriesListView component where the old div used to be
    ```
    <CountriesListView countryList={countryList} />
    ```
    Remember to import the new component accordingly

44) After recompiling we should get the same cool styled master view with flags, but with a more efficient component architecture. You can check it out by yourself using the clock DevTool, which will now report less rendering time
45) In order to demonstrate computed properties, we are going to add a summary component who's going to display the number of countries found. First of all, create the new CountriesSummary component based on CountriesListView
46) The newly created src/Components/CountriesSummary.jsx component will look like this:
    ```
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
    ```
    It has a have a single reactive prop called totalCountries, which if present will display a div with the total countries found
47) Also we need to create the computed property in the Countries store by means of decorating the corresponding get method with `@computed` and importing the decorator:
    ```
    import { observable, computed } from 'mobx';

    class CountriesStore {
        @observable countryList = [];
        @computed get totalCountries() {
            return this.countryList.length;
        }
    }
    ...
    ```
48) In src/Components/Countries.jsx just adding the component reference to the render function, its corresponding import at the top, and the `totalCountries` property retrieval from the store will do the trick:
    ```
        render() {
            const { countryList, totalCountries } = countriesStore;
            return (
                ...
                    <CountriesSummary totalCountries={totalCountries} />
                    <DevTools />
                ...
    ```
49) And finally a little styling in src/Style/Countries.scss:
    ```
    .countries-container {
        ...
        .found {
            margin-top: 25px;
        }
    ```
    So we now should be able to view how many countries match the search criteria through the magic of MobX computed properties
50) Let's add a country detail view when the user clicks on any country from the list. Initially, we are going to add a `countryclickHandler` function in the CountryItem component, and also declare a dummy implementation which will log the selected country:
    ```
    ...
    handleCountryClick = (country) => {
        console.log(country);
    }

    render() {
        const { country } = this.props;
        return (
            <li className="list" onClick={() => this.handleCountryClick(country)}>
                ...
            </li>
        );
    }
    ...
    ```
    This works fine, but according to React documentation it can have performance issues since the handler has to be generated as many times as items the list has; so, based on https://facebook.github.io/react/docs/handling-events.html, we should use this approach instead in our src/Components/CountryItem.jsx:
    ```
    export default class CountryItem extends Component {
        ...
        constructor() {
            super();
            this.clickHandler = this.clickHandler.bind(this);
        }

        clickHandler() {
            console.log(this.props.country);
        }

        render() {
            const { country } = this.props;
            return (
                <li className="list" role="menuitem" onClick={this.clickHandler}>
                    ...
                </li>
            );
        }
    }
    ```
51) However, after clicking on a country and inspecting the console, we notice that we are not getting a simple JSON country object, but an `Object {$mobx: ObservableObjectAdministration}`.
Luckily, the mobx library has an utility that assists us in the conversion process called `mobx.toJS`. This takes an observable and turns it into its underlying javascript structure. Hence, it's just a matter of importing the corresponding library and invoking it into our click handler:
    ```
    clickHandler() {
        console.log(mobx.toJS(this.props.country));
    }
    ```
    Thus getting the plain country object we wanted to view in the console.
52) Now we're ready to get down to business, so let's add a new observable property in our Countries store, named `selectedCountry`.
    ```
    @observable selectedCountry = {};
    ```
53) In src/Components/CountryItem.jsx add a function to fetch the country detail data, which will be invoked by our click handler:
    ```
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
    ```
    As usual, remember to import the corresponding country store and the request utility at the top of the file.
    ```
    import request from '../Utils/Request';
    import { countriesStore } from '../State/Countries';
    ```
54) Then, create a new component file in src/Components/CountryDetail.jsx, based on Country component, whose implementation will be:
    ```
    import React, { Component, PropTypes } from 'react';
    import { observer } from 'mobx-react';

    const blank = require('../assets/blank1x1.png');

    @observer
    export default class CountryDetail extends Component {
        static propTypes = {
            selectedCountry: PropTypes.object.isRequired,
        };

        render() {
            const { selectedCountry } = this.props;
            console.log(selectedCountry);
            return (
                <div>
                    {
                        !!selectedCountry.countryName &&
                        <div className="selected" >
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
                                        <span>{selectedCountry.population}</span>
                                    </li>
                                    <li>
                                        <span className="fieldName">Area (km^2):</span>
                                        <span>{selectedCountry.areaInSqKm}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            );
        }
    }
    ```
    It consists essentially of an unordered list of some relevant country data like continent, capital, population, and area, which is populated through corresponding properties in the seletedCountry prop provided at component creation.
55) And in the render function of our Countries component, add the corresponding assignment for the newly created `selectedCountry` observable, as well as the new CountryDetail component tag:
    ```
    render() {
        const { countryList, selectedCountry, totalCountries } = countriesStore;
        return (
            <div className="countries-container">
                ...
                <CountryDetail selectedCountry={selectedCountry} />
                <DevTools />
            </div>
        );
    }
    ```
56) After building, searching and clicking on a country we will be able to see detailed infomation about it; however, it won't hurt anybody adding some "wow" effect. That comprises:

    * Adding a static Google map to the detail view:
    For this task, we will get some help by http://staticmapmaker.com/google/ to generate an image tag which we will add to the render method.

    * Properly formatting numeric fields like area and population:
    Again, we will use react-number-format package and rewrite those `span` tags into `NumberFormat` (as directed in https://github.com/s-yadav/react-number-format)
        ```
        yarn add react-number-format
        ```

    * And finally, adding some cool rules to our Countries stylesheet.

    So, our src/Component/CountyDetail.jsx will become:

    ```
        ...
        const NumberFormat = require('react-number-format');
        ...
        @observer
        export default class CountryDetail extends Component {
            ...
            render() {
                ...
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
    ```

    And in src/Style/Countries.scss:
    ```
    .countries-container {
        ...
        .selected {
            margin-top: 15px;
            border-top: 1px dotted #abc;
            width: 650px;
            ul {
                list-style-type: none;
                margin-left: 5px;
                margin-top: 25px;
            }
            .countryHeaderContainer {
                margin-top: 25px;
            }
            .countryHeader {
                font-size: 30px;
                font-weight: bold;
                display: inline-block;
                width: 250px;
            }
            .fieldName {
                font-weight: bold;
                font-color: #888;
                width: 130px;
                display: inline-block;
            }
            .map {
                float: left;
                margin: 20px 20px 0 60px;
            }
            .details {
                float: left;
            }
        }
    }
    ```
