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
    
    it('should be able to create while loop', () => {
        let i = 0;
        while(i < 10){
            console.log(i);
            i++;
        }
    });

    it('should be able to create do while loop', () => {
        let i = 0;
        do{
            console.log(i);
            i++;
        }while(i < 10);
    });

    it('should be able to break loop', () => {
        for(let i = 0; i < 10; i++){
            if(i === 5){
                break;
            }
            console.log(i);
        }
    });

    it('should be able to continue loop', () => {
        for(let i = 0; i < 10; i++){
            if(i % 2 === 0){
                continue;
            }
            console.log(i);
        }
    });
});