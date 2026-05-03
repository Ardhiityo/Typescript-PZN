test('Should support generic method', () => {
    function create<T>(value: any): T {
        return value;
    }

    const result = create<number>(12);
    expect(result).toBe(12);

    const result2 = create<string>('Hello');
    expect(result2).toBe('Hello');
})