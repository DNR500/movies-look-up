# moviedb search


```
npm i --production
npm run start:node
```

## Dev setup
the set up of this project is build to run on OS X/Linux - some changes might be needed to run on Windows.

Entry points for code are as follows
* js - src/public/bundles/main.js
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
NODE_ENV=production npm run start:node

```
