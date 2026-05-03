test('Should support optional generic class', () => {
    class Entry {
        key;
        value;
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    //otomatis K & V = number & string
    const entry = new Entry(1, 'Eko');
    expect(entry.key).toBe(1);
    expect(entry.value).toBe('Eko');
    //diubah menjadi string error
    //entry.key = 'sample';
});
test('Should suppport optional generic class without wrong constructor ', () => {
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
    //tidak otomatis diset tipe datanya
    simple.value = 'Eko';
    //bisa diubah-ubah
    simple.value = 123;
    expect(simple.value).toBe(123);
});
test('Should suppport optional generic class without correct constructor ', () => {
    class SimpleGeneric {
        _value;
        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
        }
    }
    //otomatis diset tipe datanya
    const simple = new SimpleGeneric();
    simple.value = 'Eko';
    //tidak bisa diubah-ubah
    //error
    //simple.value = 123;
    expect(simple.value).toBe('Eko');
});
export {};
