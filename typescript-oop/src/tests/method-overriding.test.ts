describe('Method Overriding', () => {
    test('should override the sayHello method', () => {
        class Employee {
            name: string;
            
            constructor(name:string){
                this.name = name;
            }
            
            sayHello(): string {
                return `Hello, my name is ${this.name}`;
            }
        }

        class Manager extends Employee {
            position: string;
            
            constructor(name:string, position:string){
                super(name);
                this.position = position;
            }
            
            sayHello(): string {
                return `Hello, my name is ${this.name} and I am a ${this.position}`;
            }
        }

        const employee = new Employee('Budi');
        const manager = new Manager('Andi', 'Manager');

        expect(employee.sayHello()).toBe('Hello, my name is Budi');
        expect(manager.sayHello()).toBe('Hello, my name is Andi and I am a Manager');
    });
})