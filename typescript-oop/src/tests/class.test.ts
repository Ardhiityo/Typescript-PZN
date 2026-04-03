describe('Class', () => {
    it('should can create class', () => {
       class Customer {}; 
       class Order {}; 
       
       const customer:Customer = new Customer();
       const order:Order = new Order();

       expect(customer).toBeInstanceOf(Customer);
       expect(order).toBeInstanceOf(Order);
    });

    it('should can create class with constructor', () => {
       class Customer {
            constructor() {
                console.log('Customer created');
            }
       }; 
       new Customer();
       
       class Order {
            constructor() {
                console.log('Order created');
            }
       }; 
       new Order();
    });
})
