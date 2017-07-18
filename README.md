# moviedb search

Simple project that uses only react (no use of redux).

To run this project you will need your own v3 api key from MovieDb - https://www.themoviedb.org. You may need to create an account on that site if you don't already have one in order to obtain a key.

To set up..
```
npm i
npm run build
moviedbApiKey=XXXyour-api-key-hereXXX npm run start:node
```
Then you should be able to view the project on http://localhost:3000/

Reacts own state management is capable of dealing with simple requests of data, and rendering that to the dom without using redux.

Most of what constitutes state management for this app resides in 
```
src/public/bundles/app/containers/movie-search.jsx
```

This is the sole container in the project. It has 6 methods which handle user input and updating state..

* onItemSelected
* onSearchForMovie
* onRequestPage
* onCloseDetails
* setSearchResults
* setMovieData

## Dev setup
the set up of this project is build to run on OS X/Linux - some changes might be needed to run on Windows.

Entry points for code are as follows
* js (browser) - src/public/bundles/main.js
* js (node) - src/node/server.js
* css - src/public/bundles/main.scss
* html - src/public/index.marko (generated using index.html.js)

To bring in dependencies run the following in the root of the project..
```
npm i
```

### Task overview
See the scripts section of the package.json for a fuller outline..

* **npm run start:node** - runs the page in a server http://localhost:3000 (requires npm run build first!)
* **npm run lint** - runs js and json linting tasks
* **npm test** - runs javascript tests (tests currently exist on a branch)
* **npm run compile** - outputs static files for css, js, and other static assets
* **npm run build** - lints, tests, amd compiles the site
* **npm run watch** - sets up watch tasks to help speed up development
* **npm run release** - bump the version number and create a release on github

### To run project..

```
npm run build
npm run start:node
```
### For production build..

```
NODE_ENV=production npm run build
NODE_ENV=production moviedbApiKey=XXXyour-api-key-hereXXX npm run start:node

```
