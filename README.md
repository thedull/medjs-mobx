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
