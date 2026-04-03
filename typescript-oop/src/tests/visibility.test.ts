describe('Visibility', () => {
    test('should create a new instance of Employee', () => {
        class Counter {
            protected counter: number = 0;
            
            increment() {
                this.counter++;
            }
            
            getNumber(): number {
                return this.counter;
            }
        }
        
        class DoubleCounter extends Counter {
            increment() {
                this.counter += 2;
            }
        }
        
        const counter = new Counter();
        counter.increment();
        counter.increment();
        expect(counter.getNumber()).toBe(2);

        const doubleCounter = new DoubleCounter();
        doubleCounter.increment();
        doubleCounter.increment();
        expect(doubleCounter.getNumber()).toBe(4);
    });
})