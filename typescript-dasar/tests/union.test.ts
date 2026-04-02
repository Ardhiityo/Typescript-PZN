describe('Type Data Union', () => {
    it('should be able to use union type', () => {
        const process = (value: string | number | boolean) => {
            if (typeof value === 'string') {
                return value.toUpperCase();
            } else if (typeof value === 'number') {
                return value + 2;
            } else {
                return !value;
            }
        }

        expect(process("John")).toBe("JOHN");
        expect(process(123)).toBe(125);
        expect(process(true)).toBe(false);
    });
});