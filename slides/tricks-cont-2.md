##  tricks — cont

<small>https://gist.github.com/SpoBo/b45f9f656c78aca4c440cb77b1df7b13#file-generate-js</small>
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
