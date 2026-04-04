describe('Error Handling', () => {
    it('should demonstrate error handling', () => {
        class ValidationError extends Error {
            constructor(message: string) {
                super(message);
            }
        }
        
        function doubleIt(value: number): number {
            if (value === 0) {
                throw new ValidationError('Value cannot be zero');
            }
            return value * 2;
        }

        try {
           const result = doubleIt(0);
           console.log(result);
        } catch (error) {
            if(error instanceof ValidationError) {
                console.log(error.message);
                expect(error).toBeInstanceOf(ValidationError);
            }
        }
    });
})