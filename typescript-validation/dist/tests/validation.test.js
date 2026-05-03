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
