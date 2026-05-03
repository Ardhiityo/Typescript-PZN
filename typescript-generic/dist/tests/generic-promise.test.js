test('Should support generic promise', async () => {
    async function fetchData(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (value === 'Eko') {
                    resolve(`Hello ${value}`);
                }
                else {
                    reject(`Not found`);
                }
            }, 1000);
        });
    }
    const data = await fetchData('Eko');
    expect(data).toBe('Hello Eko');
    try {
        await fetchData('eko');
    }
    catch (error) {
        expect(error).toBe('Not found');
    }
});
export {};
