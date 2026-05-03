test('Should support generic class', () => {
    class Person {
        _value;
        constructor(value) {
            this._value = value;
        }
        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
        }
    }
    const person = new Person('Eko');
    person.value = person.value.toUpperCase();
    expect(person.value).toBe('EKO');
    const person2 = new Person(12);
    person2.value += 10;
    expect(person2.value).toBe(22);
});
export {};
