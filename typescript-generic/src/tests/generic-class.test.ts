test('Should support generic class', () => {
    class Person<T>{
        public _value: any;

        constructor(value: any) {
            this._value = value;
        }

        get value(): T {
            return this._value;
        }

        set value(value: T) {
            this._value = value;
        }
    }

    const person = new Person<string>('Eko');
    person.value = person.value.toUpperCase();
    expect(person.value).toBe('EKO');

    const person2 = new Person<number>(12);
    person2.value += 10;
    expect(person2.value).toBe(22);
})