import type { addFunction } from "../src/add";

describe('add', () => {
    it('should be able to add two numbers', () => {
        const add: addFunction = (value1: number, value2: number) => value1 + value2;
        
        expect(add(1, 2)).toBe(3);
        expect(add(10, 20)).toBe(30);
    });
});