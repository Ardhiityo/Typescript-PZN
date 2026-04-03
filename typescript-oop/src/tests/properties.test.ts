describe('Properties', () => {
    it('should can create properties', () => {
        class Customer {
           readonly id: number;
            name: string = 'Guest';
            age:number;

            constructor(id: number, name: string, age: number) {
                this.id = id;
                this.name = name;
                this.age = age;
            }
        };

        const customer: Customer = new Customer(1, 'John Doe' ,25);
        customer.age = 25;

        expect(customer.name).toBe('John Doe');
        expect(customer.age).toBe(25);
    });
})