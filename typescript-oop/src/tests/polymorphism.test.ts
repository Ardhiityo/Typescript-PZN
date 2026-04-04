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
    
    it('should demonstrate polymorphism typecast', () => {
        class Animal {
            constructor(public name:string){}
        }

        class Dog extends Animal {}
        
        class BullDog extends Dog {}

        function sayHello(animal: Animal) {
            //pengecekan harus dari level child paling bawah ke atas (parent)
            if(animal instanceof BullDog){
                const bullDog = animal as BullDog;
                return `Hello ${bullDog.name} from Bulldog`;
            }else if(animal instanceof Dog){
                const dog = animal as Dog;
                return `Hello ${dog.name} from Dog`;
            }else{
                const _animal = animal as Animal;
                return `Hello ${_animal.name} from Animal`;
            }
        }

        expect(sayHello(new BullDog('BullDog'))).toBe('Hello BullDog from Bulldog');
        expect(sayHello(new Dog('Dog'))).toBe('Hello Dog from Dog');
        expect(sayHello(new Animal('Animal'))).toBe('Hello Animal from Animal');
    });
})