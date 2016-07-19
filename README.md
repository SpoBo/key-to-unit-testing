# 🔑 to Unit-Testing

## Definition

> A unit test is an automated piece of code that invokes a unit of work in the system and then checks a single assumption about the behavior of that unit of work. — http://artofunittesting.com/definition-of-a-unit-test/

## Importance of Unit-Testing

* reason about API before commiting to it
* seeing how something works in isolation
* leads to
	* smaller services with Single Responsilbility Principe
	* composability of services & business logic = more use-cases
	* code that is easier to understand
* extras
	* automatic assertion that code is still working
	* don't lose time with manual testing
	* ability to test all edgecases
		* even before they happen
		* easier setup of edgecases
	* know when you break something before you push the broken code
	* immediate feedback about written code during development
	* no dead code added
		* usually lines of code that do nothing are added when it takes a long time to test that code
	* developer documentation
		* see how something is supposed to be used
		* see what the edgecases are supposed to be
	* less bugs 😁
	* sleep well 😴

## How

> "To know what to do, first know what to do not"   
> — made-up ancient chinese proverb 🙏

### How Not 😭

* AAA: everything in single it blocks
	* Arrange
	* Act
	* Assert

```javascript
describe('GreeterFactory', () => {
  describe('greeting', () => {
    it('should build a greeter and greet for short and long names but not drop the surname in strict mode', () => {
      // Arrange
      const locale = new Locale('en');
      const factory = new GreeterFactory(locale);
      let greeter = factory.build();
      // Act
      let result = greeter.greet('Bob', 'Bobber');
      // Assert
      // short name
      expect(result).to.equal('Hi Bob Bobber!');
      // long names
      expect(greeter.greet('Apu', 'Nahasapeemapetilon')).to.equal('Hi Apu!');
      // strict does not drop surname
      greeter = factory.build({strict: true});
      expect(greeter.greet('Apu', 'Nahasapeemapetilon')).to.equal('Hi Apu Nahasapeemapetilon!');
    });
  });
```

#### Why Not?

* not easy to understand
* = not easy to maintain
* because: no separation of concerns inside test


* no overview of what goes wrong and what still goes right
* test suite becomes a drag instead of a powerful tool

```text
GreeterFactory
  greeting
    ✔ it should build a greeter and greet for short and long names but not drop the surname in strict mode
```

### Ok, so ... how?

##### SPEC-style tests!

* create a `spec`-ification or story
* `describe` the steps
* does `it` work as expected given the story until now?
* `beforeEach` hooks
* one change to the state = new `describe`
* one assertion = one `it`

```javascript
describe('GreeterFactory', function() {
  describe('building a factory with an \'en\' locale', function() {
    beforeEach(function() {
      this.locale = new Locale('en')
      this.factory = new GreeterFactory(this.locale);
    });

    describe('asking for a greeter without any options', function() {
      beforeEach(function() {
        this.greeter = factory.build();
      });
    
      describe('when greeting a person', function() {
        beforeEach(function() {
          this.result = greeter.greet('Bob', 'Bobber'));
        });
      
        it('should greet using the full name', function() {
          expect(this.result).to.equal('Hi Bob Bobber!');
        });
      });
      
      describe('when greeting a person with a long name', function() {
        beforeEach(function() {
          this.result = greeter.greet('Apu', 'Nahasapeemapetilon');
        });

        it('should greet using just the first name', function() {
          expect(this.result).to.equal('Hi Apu!');
        });
      });
    });
    
    describe('asking for a strict greeter', function() {
      beforeEach(function() {
        this.greeter = factory.build({strict: true});
      });
      
      describe('when greeting a person with a long name', function() {
        beforeEach(function() {
          this.result = greeter.greet('Apu', 'Nahasapeemapetilon')
        });
        
        it('should greet using the full name', function() {
          expect(this.result).to.equal('Hi Apu Nahasapeemapetilon!');
        });
      });
    });
  });
});
```

```text
GreeterFactory
  building a factory with an \'en\' locale
    asking for a greeter without any options
      when greeting a person
      ✔ it should greet using the full name
      when greeting a person with a long name
      ✔ it should greet using just the first name
    asking for a strict greeter
      when greeting a person with a long name
      ✔ it should greet using the full name
```

### Why?

* reads like a story
* easier to understand because each step is isolated
* stories can branch to handle edgecases
* easy integration hooks for new scenarios
	* just branch off from where the story is the same in both scenarios
* easily see what does **and** doesn't work

### Test First or Test After?

* After the fact testing
	* doable but not recommended
	* only thinking about dependencies after the fact
	* might cause avoidable work
* BDD — `Behaviour Driven Development`
	* write a spec first
	* don't be afraid to split out smaller services if the spec makes no sense or seems to do too much
	* thinking about dependencies, API, usability
	* then write the logic
	* see pre-written spec go from 100% ❌ to 100% ✅
	* red to green verifies that spec actually reacts to implementation

### Where do the tests live

* tests hidden away inside tests folder — nobody looks at those
* *Spec.js files next to the services they act on
* developers see it during development
* developers see a spec is missing. they should feel guilty!
* *Spec.js means a spec is written for a single service, resulting in better specs & codebase

### Setting up mocha + chai

`npm install mocha chai sinon sinon-chai chai-as-promised chai-subset --save-dev`

test/mocha.opts — easier than commandline params
```text
--ui bdd
--require test/mocha_init.js
--inline-diffs
--recursive
--reporter spec
./**/*Spec.js
```

telling it to:

* read Spec.js files inside the codebase
* run before hook which adds functionality to test suite

test/mocha_init.js — hook ran before chai is started
```
const chai = require('chai');

// https://github.com/domenic/chai-as-promised
const chaiAsPromised = require('chai-as-promised');

// https://github.com/domenic/sinon-chai
const sinonChai = require('sinon-chai');

// easier checking of object responses
const chaiSubset = require('chai-subset');

chai.should();
// @NOTE: Need to include subset before promised as it ports all known assertions / expectations at point of inclusion.
chai.use(chaiSubset);
chai.use(chaiAsPromised);
chai.use(sinonChai);

// Make sure to expose expect as a global.
global.expect = chai.expect;
```

* chaiAsPromised makes life with promises a bit simpler
* sinonChai is awesome. master spies. spies can verify functions were called
* chaiSubset makes expectations on parts of objects easier

add scripts to package.json
```
"test": "node_modules/.bin/mocha",
"test:watch": "npm run test -- --watch",
```

### Tricks

* `(describe|it).only` — runs just that describe or it block
* `x(describe|it)` — skip describe or it block
* `--watch` — automatically run when change in spec or dependency
* `sinon`
	* spies — just remember this one. stubs & mocks build on top of this
	* mock time
* rewire npm module — test smell if used. means dependencies are not passed to the service
* don't forget you can use v8debugger on mocha tests too
* you can use JS to make your life writing mocha tests easier
	* create custom helpers
	* make functions that write describes and/or it statements

```
function testGreet(greet) {
    describe('when greeting ' + greet.first + ' ' + greet.last, function() {
        beforeEach(function(result) {
            this.result = greeter.greet(greet.first, greet.last);
        });

        it('should greet as ' + greet.expected, function() {
            expect(this.result).to.equal(greet.expected);
        });
    });
}

[
    {
        first: 'Bob',
        last: 'Bobber',
        expected: 'Hi Bob Bobber!'
    },
    {
        first: 'Vincent',
        last: 'Whose last name we dare not speak',
        expected: 'Hi Vincent!'
    }
].forEach(testGreet);
```

### Pain Points

* Promises / Async — chai-as-promised helps a bit
	* make sure beforeEach block is returned a Promise that if resolved allows verifying all expectations
	* if using `eventually` make sure to return the evaluation in the it block
	* if checking multiple things in 1 it (not best practice) use `return Promise.all`.
	* setTimeouts can cause issues. use `done` arguent.
* Arrow Function Syntax
	* don't use it. `this` is important in mocha.
* always declare variables on `this` inside `beforeEach` blocks to preserve the right context and prevent mixing state between tests
* equality `expect(objectResult).to.equal(otherObjectThatIsSimilar)` will always fail — don't forget `to.deep.equals` or alternatively use `chaiSubset` syntax

### Good Developer Experience

* `npm run test` — single run of spec suite
* `npm run test:watch` — adds `--watch` option
* Continuous Integration
* git-hook workflow to run tests before commit
* add `DEBUG=whatIAmWorkingOn` to show debug statements in spec

### Programming Tips

* prefer "Pure Functions"
	* function just uses arguments given to it and always returns the same response for the same set of arguments
	* super simple to test
		* no other dependencies
		* no state being built beforehand
		* code easy to move around
	* easy to reason about