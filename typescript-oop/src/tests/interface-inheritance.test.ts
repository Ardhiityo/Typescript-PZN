describe('Interface Inheritance', () => {
    test('should create a new instance of Employee', () => {
        interface HasName {
            name: string;
        }

        interface HasSayHello {
            sayHello(): string;
        }
        
        class Person implements HasName, HasSayHello {
            name: string;
            
            constructor(name:string){
                this.name = name;
            }
            
            sayHello(): string {
                return `Hello, my name is ${this.name}`;
            }
        }

        const person: Person = new Person('Budi');
        expect(person.name).toBe('Budi');
        expect(person.sayHello()).toBe('Hello, my name is Budi');
    });
})