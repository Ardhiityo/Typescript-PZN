describe('Static Property', () => {
    it('should demonstrate static property', () => {
        
        //penulisan property static biasanya menggunakan uppercase
        class Application {
            static readonly AUTHOR: string = 'Eko Kurniawan Khannedy';
        }

        expect(Application.AUTHOR).toBe('Eko Kurniawan Khannedy');
    });

    it('should demonstrate static method', () => {
        
        //ketika mengakses static method, maka pada static method hanya bisa memanggil static method lainnya
        class Application {
            static sayHello(name: string): string {
                return `${this.say()} ${name}`;
            }

            static say(): string {
                return 'Hello';
            }
        }

        expect(Application.sayHello('John')).toBe('Hello John');
    });
})