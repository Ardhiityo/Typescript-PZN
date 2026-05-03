test('Should support multiple generic class', () => {
    class Entry {
        key;
        value;
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    class Triple {
        first;
        second;
        third;
        constructor(first, second, third) {
            this.first = first;
            this.second = second;
            this.third = third;
        }
    }
    const entry = new Entry(1, 'Eko');
    expect(entry.key).toBe(1);
    expect(entry.value).toBe('Eko');
    const triple = new Triple(1, 'Eko', 'Khannedy');
    expect(triple.first).toBe(1);
    expect(triple.second).toBe('Eko');
    expect(triple.third).toBe('Khannedy');
});
export {};
