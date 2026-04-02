export interface Employee {
    id: Number;
    name: String;
    division: String;
}

export interface Manager extends Employee {
    totalNumberOfEmployees: number;
}
