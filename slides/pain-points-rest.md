##  Pain Points: Rest

* Arrow Function Syntax
	* don't use it. `this` is important in mocha.
* always declare variables on `this` inside `beforeEach` blocks to preserve the right context and prevent mixing state between tests
* equality `expect(obj).to.equal(similarObj)` will always fail — don't forget `to.deep.equals` or alternatively use `chaiSubset` syntax
