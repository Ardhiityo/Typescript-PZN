import type { Category, Product } from "../src/types/alias";

describe("Type Alias", () => {
    it("should be able to use type alias", () => {
        const category:Category = {
            id: 1,
            name: "Category 1"
        } 

        const product:Product = {
            id: 1,
            name: "Product 1",
            category: category
        } 

        console.log(product);
    });
});