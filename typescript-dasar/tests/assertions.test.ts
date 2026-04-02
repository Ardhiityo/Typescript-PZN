import type { Person } from "../src/person";

describe('Assertions', () => {
    it('should be able to assert', () => {
        const user:any = {
            name: "John"
        };
        
        //variabel user sekarang dianggap sebagai tipe data Person
        const user2:Person = user as Person;
        
        expect(user2.name).toBe("John");
        
        //error karena method sayHello tidak ada di object user
        //expect(user2.sayHello("John")).toBe("Hello John");
    });
});