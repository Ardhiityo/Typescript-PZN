describe('Ternary Operator', () => {
    it('should be able to create ternary operator', () => {
        const value:number = 10;

        const result:string = value === 10 ? "Value is 10" : "Value is not 10";

        expect(result).toBe("Value is 10");
    });
});