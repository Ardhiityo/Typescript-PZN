describe("Array", function() {
    it("should be able to use array", function() {
        // Cara 1
        //const names: Array<string> = ["John", "Doe", "Jane"];
        //console.log(names);
        
        // Array Readonly cara 1
        const names: ReadonlyArray<string> = ["John", "Doe", "Jane"];
        console.log(names);
        
        
        // Cara 2
        //const numbers: string[] = ["John", "Doe", "Jane"];
        //console.log(numbers);
        
        // Array Readonly cara 2
        const numbers: readonly number[] = [1, 2, 3, 4, 5];
        console.log(numbers);
        
        // Tuple
        const person: readonly [string, number, boolean] = ["John", 30, true];
        console.log(person);
    });
})