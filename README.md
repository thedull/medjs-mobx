# MobX with React workshop

## Setup

1) Create code anywhere empty box
2) Add nvm 
3) Install node 7
4) Add yarn
5) Install yeoman
6) Add https://github.com/MiRinZhang/react-webpack-mobx generator
7) Create new app via Yeoman
8) Update webpack.config (devServer: disableHostCheck: true, open: false -- output: publicPath: <<box name:port/>>)
9) Add mobs-react-devtools via yarn
10) In src/components/Todo.jsx add DevTools to imports and tag inside render method
11) yarn dev and validate DevTools working

12) Break dev task temporarily
13) In src/Components/Main Add new link to countries 
14) In src/Router/Index add countries to chunks import and add route to countries
15) In src/Router/Chunks add export for countries (duplicate todo and change to countries)
16) Create src/Components/Countries.jsx by duplicating Intro
17) In newly created Countries comment out style import, change className, add DevTools (import + tag), remove info from inside div and create dummy text
18) Yarn dev. Check for errors and validate everything is working OK for new Countries page, including DevTools

19) Break dev task temporarily
20) Duplicate Style/Todo into Countries
21) Edit Style/Countries to only leave input - width: 150px
22) Add countries style to Components/Countries
23) Reactivate dev task
24) In Components/Countries change Dummy text and create an input with placeholder "Search..." and autofocus attr
25) Create first handleKeyDown implementation and add to onKeyDown attr as static
26) Move console.log to new static findCountries method
27) Implement request and log RestResponse.result
28) Create countries store in State by means of duplicating State/Index and implement similarly
29) In Components/Countries import { countries } store and apply assignment into findCountries
30) Add const { countriesList } = countries immediately inside render;
30) Create div and ul template for countries inside render, but outside list
31) Add @observer to class and import proper dependency 
32) Create dummy Countries.viewDetails static method logging country
33) Add parsing to JS object into logging and add proper mobs import 

34) In State/Countries change class name to CountriesStore, and fix export clause
35) Add @computed get totalCountries property and add computed to imports
36) In Components/Countries add const totalCountries prop assignment and add summary pseudo component based on total countries existence
37) Add styling to list items (.list) and summary (.found) in Style/Countries
38) Generate flag sprites, download to local, and upload images (blank+flags) to new assets folder inside src  
39) Install dev copy-webpack-plugin and add to webpack config 
40) **Fix handling of png files in WDS**

41) Update viewDetails function and get the info from web service using request
42) In State/Countries add new observable selectedCountry property to CountriesStore
43) In Components/Countries add inside render method a div with the info of the new property
44) Add selectedCountry property to countries assignment and selectedCountry inside viewDetails

## Resources

NVM: https://github.com/creationix/nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

Yarn: https://yarnpkg.com
curl -o- -L https://yarnpkg.com/install.sh | bash

* https://github.com/MiRinZhang/react-webpack-mobx

A react boilerplate with webpack(2.2.1)、React-router(3.0.2)、Mobxjs(3.1.0) and fetch(2.0.2)

npm i -g yo | yarn add global yo
npm i -g generator-react-webpack-mobx | yarn add global generator-react-webpack-mobx

yo react-webpack-mobx <ProjectName>

cd <ProjectDir>
npm run dev | yarn dev
Opens http://localhost:4040

** APIS

- https://jsonplaceholder.typicode.com/
  (Users, Posts, Photos, Albums, Todos)
   https://github.com/typicode/jsonplaceholder#how-to

- http://www.geonames.org/export/web-services.html
  (Country info)
  http://api.geonames.org/countryInfoJSON?lang=es&country=DE&username=thedull

  (Country code by lat, long)
  http://api.geonames.org/countryCodeJSON?lat=-43.9509&lng=-34.4618&username=thedull

- http://services.groupkt.com/country/search?text=un
  (Countries by name)

- https://www.flag-sprites.com/es/
  (Flag sprites)

