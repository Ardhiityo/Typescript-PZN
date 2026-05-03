test('Should support generic method', () => {
    function create(value) {
        return value;
    }
    const result = create(12);
    expect(result).toBe(12);
    const result2 = create('Hello');
    expect(result2).toBe('Hello');
});
export {};
