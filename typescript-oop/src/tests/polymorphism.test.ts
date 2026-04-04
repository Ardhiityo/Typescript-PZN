describe('Polymorphism', () => {
    it('should demonstrate polymorphism', () => {
        class Animal {}

        class Dog extends Animal {}

        let animal: Animal = new Animal();
        animal = new Dog();

        expect(animal instanceof Animal).toBe(true);
        expect(animal instanceof Dog).toBe(true);
    });

    it('should demonstrate polymorphism with method', () => {
        class Animal {
            constructor(public name:string){}
        }

        class Dog extends Animal {}

        //parameter polymorphism : bisa menerima tipe data apa saja selama masih turunan dari parent class
        function sayHello(animal: Animal) {
            return `Hello ${animal.name}`;
        }

        expect(sayHello(new Animal('Animal'))).toBe('Hello Animal');
        expect(sayHello(new Dog('Dog'))).toBe('Hello Dog');
    });
})