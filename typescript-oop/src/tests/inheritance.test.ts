describe('Inheritance', () => {
    test('should create a new instance of Employee', () => {
   
        class Employee {
            name:string;
            
            constructor(name:string){
                this.name = name;
            }
        }

        class Manager extends Employee {
            //   
        }
        
        class Director extends Manager {
            //   
        }

        const employee = new Employee("Budi");
        const manager = new Manager("Andi");
        const director = new Director("Joko");

        console.log(employee);
        console.log(manager);
        console.log(director);
    });
})