test('Should suppport generic parameter default class', () => {
    
    //otomatis default value nya adalah string (jika tidak diset)
    class SimpleGeneric<T = string> {
        public _value?: T;

        get value(): T | undefined {
            return this._value;
        }

        set value(value: T) {
            this._value = value;
        }
    }

    const simple = new SimpleGeneric();
    simple.value = 'Eko';
    
    //error
    //simple.value = 123;

    expect(simple.value).toBe('Eko');
})