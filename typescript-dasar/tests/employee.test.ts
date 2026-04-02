import type { Employee, Manager } from "../src/employee";

describe('Employee', () => {
    it('should be able to create an employee', () => {
        const employee: Employee = {
            id: 1,
            name: "John",
            division: "IT"
        };
        
        expect(employee.id).toBe(1);
        expect(employee.name).toBe("John");
        expect(employee.division).toBe("IT");
        
        const manager: Manager = {
            id: 2,
            name: "John",
            division: "IT",
            totalNumberOfEmployees: 10
        };
        
        expect(manager.id).toBe(2);
        expect(manager.name).toBe("John");
        expect(manager.division).toBe("IT");
        expect(manager.totalNumberOfEmployees).toBe(10);
    });
});