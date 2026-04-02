import type { StringObject } from "../src/string-object";

describe('String Object', () => {
    it('should be able to create a string object', () => {
        const stringObject: StringObject = {
            name: "John",
            age: "30"
        };
        
        expect(stringObject.name).toBe("John");
        expect(stringObject.age).toBe("30");
    });
});