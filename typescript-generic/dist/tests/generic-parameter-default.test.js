test('Should suppport generic parameter default class', () => {
    //otomatis default value nya adalah string (jika tidak diset)
    class SimpleGeneric {
        _value;
        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
        }
    }
    const simple = new SimpleGeneric();
    simple.value = 'Eko';
    //error
    //simple.value = 123;
    expect(simple.value).toBe('Eko');
});
export {};
