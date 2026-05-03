test('Should support generic', () => {
    class Person {
        value;
        constructor(value) {
            this.value = value;
        }
    }
    let person = new Person('Eko');
    expect(person.value.toUpperCase()).toBe('EKO');
    person = new Person(12);
    expect(person.value + 10).toBe(22);
});
export {};
