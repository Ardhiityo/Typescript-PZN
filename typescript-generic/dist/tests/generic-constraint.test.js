test('Should support generic constraint class', () => {
    class EmployeeData {
        employee;
        constructor(employee) {
            this.employee = employee;
        }
    }
    new EmployeeData({
        id: 1,
        name: 'Eko'
    });
    new EmployeeData({
        id: 1,
        name: 'Eko',
        numberOfEmployee: 12
    });
    new EmployeeData({
        id: 1,
        name: 'Eko',
        numberOfEmployee: 12,
        numberOfManager: 15
    });
    //error
    //new EmployeeData<string>('Eko');
});
export {};
