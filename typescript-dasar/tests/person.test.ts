import type { Person } from "../src/person";

describe('Person', () => {
    it('should be able to create a person', () => {
        const person: Person = {
            name: "John",
            sayHello: (name: string) => `Hello ${name}`
        };
        
        expect(person.name).toBe("John");
        expect(person.sayHello("John")).toBe("Hello John");
    });
});