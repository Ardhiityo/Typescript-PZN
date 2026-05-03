test('Should support without generic', () => {
    class Person {
        public name: any;

        constructor(name: any) {
            this.name = name;
        }
    }

    let person = new Person('Eko');
    
    //tidak aman, karena tipe data berubah-ubah
    person.name = 'Eko';
    person.name = true;
    person.name = 10;

    console.log(person);
})