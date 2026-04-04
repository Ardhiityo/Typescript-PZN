describe('Class Relationship', () => {
    it('should demonstrate class relationship', () => {
        class Person {
            constructor(public name: string) {}
        }

        class Customer {
            constructor(public name: string) {}
        }
        
        const person:Person = new Customer('Doe');
        
        expect(person).toBeInstanceOf(Customer);
    });
})