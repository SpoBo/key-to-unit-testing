##  Setting up Mocha &amp; Chai — cont

* `chaiAsPromised` makes life with promises a bit simpler
* `sinonChai` is awesome. master spies. spies can verify functions were called
* `chaiSubset` makes expectations on parts of objects easier

<small>add scripts to package.json</small>
```
"test": "node_modules/.bin/mocha",
"test:watch": "npm run test -- --watch",
```
