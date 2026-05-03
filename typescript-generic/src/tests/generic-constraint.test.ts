test('Should support generic constraint class', () => {
    interface Employee {
        id: number,
        name: string
    }

    interface Manager extends Employee {
        numberOfEmployee: number;
    }

    interface VP extends Manager {
        numberOfManager: number;
    }

    class EmployeeData<T extends Employee> {
        constructor(public employee: T) { }
    }

    new EmployeeData<Employee>({
        id: 1,
        name: 'Eko'
    });

    new EmployeeData<Manager>({
        id: 1,
        name: 'Eko',
        numberOfEmployee: 12
    });

    new EmployeeData<VP>({
        id: 1,
        name: 'Eko',
        numberOfEmployee: 12,
        numberOfManager: 15
    });

    //error
    //new EmployeeData<string>('Eko');
})