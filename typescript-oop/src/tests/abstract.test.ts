describe('Abstract Class', () => {
    it('should demonstrate abstract class', () => {
        abstract class Employee {
            constructor(public name: string) {}
            
            //wajib di implementasikan oleh class turunannya
            abstract getSalary(): number;
            
            //tidak wajib di implementasikan oleh class turunannya
            info(): string {
                return `Name: ${this.name}, Salary: ${this.getSalary()}`;
            }
        }

        class Manager extends Employee {
            constructor(name: string, public salary: number) {
                super(name);
            }

            getSalary(): number {
                return this.salary;
            }
        }

        const manager = new Manager('John', 1000000);

        expect(manager.getSalary()).toBe(1000000);
        expect(manager.info()).toBe('Name: John, Salary: 1000000');
    });
})