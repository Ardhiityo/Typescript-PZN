test('Should support without generic', () => {
    class Person {
        name;
        constructor(name) {
            this.name = name;
        }
    }
    let person = new Person('Eko');
    person.name = 'Eko';
    person.name = true;
    console.log(person);
});
export {};
