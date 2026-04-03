describe('Function', () => {
    it('should be able to create function', () => {
        function sayHello(name:string):string{
            return `Hello ${name}`;
        }

        expect(sayHello("John")).toBe("Hello John");
        
        function sayHello2(name:string):void{
            console.log(`Hello ${name}`);
        }

        sayHello2("John");
    });
    
    it('should be able to create function with default value', () => {
        function sayHello(name:string = "John"):string{
            return `Hello ${name}`;
        }

        expect(sayHello()).toBe("Hello John");
    });

    it('should be able to create function with rest parameter', () => {
        function sayHello(name:string, ...hobbies:string[]):string{
            return `Hello ${name}, hobbies: ${hobbies.join(", ")}`;
        }

        expect(sayHello("John", "Reading", "Swimming", "Coding")).toBe("Hello John, hobbies: Reading, Swimming, Coding");
    });

    it('should be able to create function with optional parameter', () => {
        function sayHello(name:string, age?:number):string{
            return `Hello ${name}, age: ${age}`;
        }

        expect(sayHello("John", 25)).toBe("Hello John, age: 25");
        expect(sayHello("John")).toBe("Hello John, age: undefined");
    });
});