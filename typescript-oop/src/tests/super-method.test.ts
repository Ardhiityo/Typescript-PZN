describe('Super Method', () => {
    test('should call the parent method', () => {
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
                return super.sayHello() + ` and I am a ${this.position}`;
            }
        }

        const manager = new Manager('Andi', 'Manager');
        expect(manager.sayHello()).toBe('Hello, my name is Andi and I am a Manager');
    });
})