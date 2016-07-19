##  Setting up Mocha &amp; Chai — cont

<small>`test/mocha_init.js` — hook ran before chai is started</small>

```
const chai = require('chai');

// https://github.com/domenic/chai-as-promised
const chaiAsPromised = require('chai-as-promised');

// https://github.com/domenic/sinon-chai
const sinonChai = require('sinon-chai');

// easier checking of object responses
const chaiSubset = require('chai-subset');

chai.should();
// Need to include subset before promised as it ports all known assertions  expectations at point of inclusion.
chai.use(chaiSubset);
chai.use(chaiAsPromised);
chai.use(sinonChai);

// Make sure to expose expect as a global.
global.expect = chai.expect;
```
