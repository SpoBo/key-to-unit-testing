##  Setting up Mocha &amp; Chai

<small>`npm install mocha chai sinon sinon-chai chai-as-promised chai-subset --save-dev`</small>

<small>`test/mocha.opts` — easier than commandline params</small>

```text
--ui bdd
--require test/mocha_init.js
--inline-diffs
--recursive
--reporter spec
./**/*Spec.js
```

<small>telling it to:</small>

* read `*Spec.js` files inside the codebase
* run before hook which adds functionality to test suite
