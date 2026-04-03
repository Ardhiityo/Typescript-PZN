describe('Getter Setter', () => {
    it('should can create getter and setter', () => {
        class Customer {
            _name?: string;
            
            get name(): string {
                if(this._name){
                    return this._name;
                }else{
                    return 'Guest';
                }
            }

            set name(name: string) {
                if(name != ''){
                    this._name = name;
                }
            }
         
        };

        const customer: Customer = new Customer();
        //akan memanggil getter
        expect(customer.name).toBe('Guest');

        //akan memanggil setter
        customer.name = 'John Doe';
        expect(customer.name).toBe('John Doe');

        //akan memanggil setter
        customer.name = '';
        expect(customer.name).toBe('John Doe');
    });
})