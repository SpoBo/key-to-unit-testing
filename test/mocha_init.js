const chai = require('chai');

// https://github.com/domenic/sinon-chai
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

// Make sure to expose expect as a global.
global.expect = chai.expect;
