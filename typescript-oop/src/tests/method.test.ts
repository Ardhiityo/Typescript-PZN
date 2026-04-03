describe('Method', () => {
    it('should can create method', () => {
        class Customer {
           readonly id: number;
            name: string = 'Guest';
            age:number;

            constructor(id: number, name: string, age: number) {
                this.id = id;
                this.name = name;
                this.age = age;
            }

            sayHello(name: string): string {
                return `Hello ${name} my name is ${this.name}`;
            }
        };

        const customer: Customer = new Customer(1, 'John Doe' ,25);
        expect(customer.sayHello('Budi')).toBe('Hello Budi my name is John Doe');
    });
})