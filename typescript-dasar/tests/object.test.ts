describe('Object', () => {
    it('should be able to use object', () => {
        const person: { name: string, age: number } = {
            name: "John",
            age: 30
        }
        
        console.log(person);
    });
});