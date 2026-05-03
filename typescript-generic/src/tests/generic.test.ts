test('Should support generic', () => {
    class Person<T>{
        public value: any;

        constructor(value: any) {
            this.value = value;
        }
    }

    let person = new Person<string>('Eko');
    expect(person.value.toUpperCase()).toBe('EKO');

    person = new Person<number>(12);
    expect(person.value + 10).toBe(22);
})