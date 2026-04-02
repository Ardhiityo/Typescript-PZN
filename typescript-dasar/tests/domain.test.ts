import type { Domain } from "../src/domain";

describe('Domain', () => {
    it('should be able to create a domain', () => {
        const domain: Domain = {
            id: 1,
            name: "John"
        };
        
        expect(domain.id).toBe(1);
        expect(domain.name).toBe("John");
    });
});