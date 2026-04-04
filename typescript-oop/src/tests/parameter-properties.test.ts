describe('Parameter Properties', () => {
    it('should create a new instance of Employee', () => {
        class Employee {
            constructor(public name: string) {}
        }

        const employee = new Employee('Budi');
        expect(employee.name).toBe('Budi');
    });
})