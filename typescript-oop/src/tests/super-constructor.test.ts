describe('Super Constructor', () => {
    test('should create a new instance of Employee', () => {
        class Employee {
            name: string;
            
            constructor(name:string){
                this.name = name;
            }
        }

        class Manager extends Employee {
            position: string;
            
            constructor(name:string, position:string){
                //tidak perlu this.name = name; karena sudah ada di constructor parent
                //super(name) akan memanggil constructor parent
                super(name);
                this.position = position;
            }
        }

        const manager = new Manager('Andi', 'Manager');

        console.log(manager);
    });
})