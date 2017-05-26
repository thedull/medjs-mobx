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
