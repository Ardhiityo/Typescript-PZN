import type { Seller } from "../src/seller";

describe('Seller', () => {
    it('should be able to create a seller', () => {
        const seller: Seller = {
            id: 1,
            name: "John"
        }
        
        console.log(seller);
    });
});