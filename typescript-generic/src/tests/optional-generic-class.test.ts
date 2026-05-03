test('Should support optional generic class', () => {
    class Entry<K, V>{
        constructor(public key: K, public value: V) { }
    }

    //otomatis K & V = number & string
    const entry = new Entry(1, 'Eko');

    expect(entry.key).toBe(1);
    expect(entry.value).toBe('Eko');

    //diubah menjadi string error
    //entry.key = 'sample';
});

test('Should suppport optional generic class without wrong constructor ', () => {
    class SimpleGeneric<T> {
        public _value?: T;

        get value(): T | undefined {
            return this._value;
        }

        set value(value: T) {
            this._value = value;
        }
    }

    const simple = new SimpleGeneric();

    //tidak otomatis diset tipe datanya
    simple.value = 'Eko';
    //bisa diubah-ubah
    simple.value = 123;

    expect(simple.value).toBe(123);
})

test('Should suppport optional generic class without correct constructor ', () => {
    class SimpleGeneric<T> {
        public _value?: T;

        get value(): T | undefined {
            return this._value;
        }

        set value(value: T) {
            this._value = value;
        }
    }

    //otomatis diset tipe datanya
    const simple = new SimpleGeneric<string>();

    simple.value = 'Eko';

    //tidak bisa diubah-ubah
    //error
    //simple.value = 123;

    expect(simple.value).toBe('Eko');
})