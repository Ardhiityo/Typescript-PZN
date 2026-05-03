test('Should support multiple generic class', () => {
    class Entry<K, V> {
        constructor(public key: K, public value: V) { }
    }
    class Triple<K, V, T> {
        constructor(public first: K, public second: V, public third: T) { }
    }

    const entry = new Entry<number, string>(1, 'Eko');
    expect(entry.key).toBe(1);
    expect(entry.value).toBe('Eko');

    const triple = new Triple<number, string, string>(1, 'Eko', 'Khannedy');
    expect(triple.first).toBe(1);
    expect(triple.second).toBe('Eko');
    expect(triple.third).toBe('Khannedy');
})