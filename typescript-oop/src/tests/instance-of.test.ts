describe('Instance Of', () => {
    it('should check if an object is an instance of a class', () => {
        class Animal {}

        class Dog {}

        const animal = new Animal();
        const dog = new Dog();

        expect(animal instanceof Animal).toBe(true);
        expect(animal instanceof Dog).toBe(false);
        
        expect(dog instanceof Animal).toBe(false);
        expect(dog instanceof Dog).toBe(true);
    });
})