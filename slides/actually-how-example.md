##  actually how - example

<small>https://gist.github.com/SpoBo/b45f9f656c78aca4c440cb77b1df7b13#file-spec2-js</small>

```js
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
