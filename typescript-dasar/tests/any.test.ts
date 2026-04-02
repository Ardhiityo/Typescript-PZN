describe("Type Data Any", () => {
    it("should be able to use any type", () => {
        const data: any = {
            'name': 'John',
            'age': 30,
            'address': 'Jl. Sudirman No. 123'
        };
        
        data.name = "Jane";
        data.age = 25;
        data.address = "Jl. Sudirman No. 456";
        
        console.log(data);
    });
});