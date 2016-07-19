##  how not - example

<small>https://gist.github.com/SpoBo/b45f9f656c78aca4c440cb77b1df7b13#file-aaa2-js</small>

```js
describe('GreeterFactory', () => {
  describe('greeting', () => {
    it('should work', () => {
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
});
```
