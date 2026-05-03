import z from "zod";
test('Should support primitive type validation', () => {
    const usernameSchema = z.string().min(3).max(100);
    const isAdminSchema = z.boolean();
    const priceSchema = z.number().positive().lte(1000000);
    const username = usernameSchema.parse('Eko');
    const isAdmin = isAdminSchema.parse(true);
    const price = priceSchema.parse(10);
    expect(username).toBe('Eko');
    expect(isAdmin).toBe(true);
    expect(price).toBe(10);
    /**
     * sample error
     ZodError: [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 3,
        "inclusive": true,
        "path": [],
        "message": "Too small: expected string to have >=3 characters"
      }
    ]
     */
});
test('Should support primitive conversion', () => {
    const usernameSchema = z.coerce.string().min(3).max(100);
    const isAdminSchema = z.coerce.boolean();
    const priceSchema = z.coerce.number().positive().lte(1000000);
    //otomatis dikonversi menjadi string
    const username = usernameSchema.parse(123);
    //otomatis dikonversi menjadi boolean
    const isAdmin = isAdminSchema.parse('true');
    //otomatis dikonversi menjadi number
    const price = priceSchema.parse('10');
    expect(username).toBe('123');
    expect(isAdmin).toBe(true);
    expect(price).toBe(10);
});
test('Should support primitive without conversion', () => {
    const usernameSchema = z.string().min(3).max(100);
    const isAdminSchema = z.boolean();
    const priceSchema = z.number().positive().lte(1000000);
    //tidak otomatis dikonversi menjadi string
    //error
    const username = usernameSchema.parse(123);
    //tidak otomatis dikonversi menjadi boolean
    //error
    const isAdmin = isAdminSchema.parse('true');
    //tidak otomatis dikonversi menjadi number
    //errorr
    const price = priceSchema.parse('10');
});
test('Should support date validation', () => {
    const birthdaySchema = z.coerce.date()
        .min(new Date('1990-01-01'))
        .max(new Date('2020-01-01'));
    const birthday = birthdaySchema.parse('2020-01-01');
    expect(birthday).toEqual(new Date('2020-01-01'));
    const birthday2 = birthdaySchema.parse(new Date('1990-01-01'));
    expect(birthday2).toEqual(new Date('1990-01-01'));
});
