test('Should support generic collection of array', () => {
    const data = new Array<number>();

    data.push(1);
    data.push(2);
    data.push(3);

    //error
    //data.push('salah');

    expect(data).toEqual([1, 2, 3]);
})

test('Should support generic collection of set', () => {
    const data = new Set<string>();

    data.add('Eko');
    data.add('Kurniawan');

    expect(data.size).toBe(2);
    expect(data.has('Eko')).toBe(true);
    expect(data.has('Kurniawan')).toBe(true);
})

test('Should support generic collection of map', () => {
    const data = new Map<string, number>();

    data.set('Eko', 1);
    data.set('Kurniawan', 2);

    expect(data.get('Eko')).toBe(1);
    expect(data.get('Kurniawan')).toBe(2);
})