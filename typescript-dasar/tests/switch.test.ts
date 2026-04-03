describe('Switch Statement', () => {
    it('should be able to create switch statement', () => {
        const value:number = 10;

        function getHello(value:number):string{
            switch(value){
                case 10:
                    return "Value is 10";
                default:
                    return "Value is not 10";
            }
        }

        expect(getHello(value)).toBe("Value is 10");
    });
});