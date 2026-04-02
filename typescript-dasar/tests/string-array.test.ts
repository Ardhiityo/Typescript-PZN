import type { StringArray } from "../src/string-array";

describe('String Array', () => {
    it('should be able to create a string array', () => {
        const stringArray: StringArray = ["Hello", "World"];
        
        expect(stringArray[0]).toBe("Hello");
        expect(stringArray[1]).toBe("World");
    });
});