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
});