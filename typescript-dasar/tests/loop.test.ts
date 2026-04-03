describe('Loop', () => {
    it('should be able to create loop', () => {
        for(let i = 0; i < 10; i++){
            console.log(i);
        }
    });
    
    it('should be able to create for of loop', () => {
        const names:string[] = ["John", "Doe", "Jane", "Doe"];

        for(const name of names){
            console.log(name);
        }
    });

    it('should be able to create for in loop', () => {
        const names:string[] = ["John", "Doe", "Jane", "Doe"];

        for(const name in names){
            console.log(names[name]);
        }
    });
});