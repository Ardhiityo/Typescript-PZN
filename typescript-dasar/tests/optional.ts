describe('Optional', () => {
    it('should be able to use optional', () => {

    // ? : berarti boleh undefined atau boleh tidak diisi
     function sayHello(name?: string | null) {
        if(name){
            console.log(`Hello ${name}`);
        }else{
            console.log(`Hello`);
        }
     }

     sayHello("Budi");
     sayHello(undefined);
     sayHello(null);
    });
});