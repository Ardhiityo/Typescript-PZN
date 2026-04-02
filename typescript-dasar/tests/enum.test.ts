import { CustomerType } from "../src/enum";

describe('Enum', () => {
    it('should be able to use enum', () => {
        
        const customer: {id:Number, name:String, type:CustomerType} = {
            id: 1,
            name: "Customer 1",
            type: CustomerType.REGULAR
        }
        
        console.log(customer);
    });
});