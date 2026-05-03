import z, { ZodError, RefinementCtx } from "zod";

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
})

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
})

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
})

test('Should support date validation', () => {
  const birthdaySchema = z.coerce.date()
    .min(new Date('1990-01-01'))
    .max(new Date('2020-01-01'));

  const birthday = birthdaySchema.parse('2020-01-01');
  expect(birthday).toEqual(new Date('2020-01-01'));

  const birthday2 = birthdaySchema.parse(new Date('1990-01-01'));
  expect(birthday2).toEqual(new Date('1990-01-01'));
})

test('Should support validation error throw error', () => {
  const nameSchema = z.string().min(3).max(100);

  try {
    nameSchema.parse('ek');
  } catch (error) {
    if (error instanceof ZodError)
      console.log(error.issues[0]?.message);
  }
})

test('Should support validation error without throw error', () => {
  const nameSchema = z.string().min(3).max(100);

  const name = nameSchema.safeParse('ek');

  if (name.success) {
    console.log(name.data);
  } else {
    console.log(name.error.issues[0]?.message);
  }
})

test('Should support validation object', () => {
  const loginSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(3).max(100)
  })

  //data yang tidak diperlukan tidak akan diambil
  const request = {
    username: 'eko',
    password: 'rahasia',
    sample: 'sample'
  }

  const login = loginSchema.parse(request);

  expect(login).toEqual({
    username: 'eko',
    password: 'rahasia',
  })
})

test('Should support validation nested object', () => {
  const loginSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
    address: z.object({
      street: z.string().min(3).max(100),
      country: z.string().min(3).max(100)
    })
  })

  //data yang tidak diperlukan tidak akan diambil
  const request = {
    username: 'eko',
    password: 'rahasia',
    sample: 'sample',
    address: {
      street: 'Jalan belum ada',
      country: 'Indonesia'
    }
  }

  const login = loginSchema.parse(request);

  expect(login).toEqual({
    username: 'eko',
    password: 'rahasia',
    address: {
      street: 'Jalan belum ada',
      country: 'Indonesia'
    }
  })
})

test('Should support array validation', () => {
  const hobbiesShema = z.array(
    z.string().min(3).max(100)
  ).min(2).max(3)

  const hobbies: Array<string> = hobbiesShema.parse(
    ['Coding', 'Reading', 'Swimming']
  );

  expect(hobbies).toEqual(['Coding', 'Reading', 'Swimming']);
})

test('Should support set validation', () => {
  const hobbiesShema = z.set(
    z.string().min(3).max(100)
  ).min(2).max(3)

  //set hanya menerima data unique
  const hobbies: Set<string> = hobbiesShema.parse(
    new Set(['Coding', 'Reading', 'Swimming', 'Coding', 'Reading', 'Swimming'])
  );

  expect(hobbies).toEqual(new Set(['Coding', 'Reading', 'Swimming']));
})

test('Should support map validation', () => {
  const hobbiesShema = z.map(
    z.string().min(3).max(100), z.string().min(3).max(100)
  ).min(2).max(3)

  const hobbies: Map<string, string> = hobbiesShema.parse(
    new Map([
      ['name', 'eko'],
      ['name', 'budi'],
      ['hobby', 'coding'],
      ['hobby', 'reading'],
    ])
  );

  expect(hobbies).toEqual(new Map([
    ['name', 'eko'],
    ['name', 'budi'],
    ['hobby', 'coding'],
    ['hobby', 'reading'],
  ]));
})

test('Should support custom validation message', () => {
  const loginSchema = z.object({
    username: z.string('Tipe data harus string').min(3, 'Minimal 3 karakter').max(100, 'Maksimal 100 karakter'),
    password: z.string('Tipe data harus string').min(3, 'Minimal 3 karakter').max(100, 'Maksimal 100 karakter')
  })

  const request = {
    username: 'ek',
    password: 'r',
  }

  try {
    loginSchema.parse(request);
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach(value => {
        // Gunakan String() untuk membungkus path agar aman dari tipe 'symbol'
        console.log(`${String(value.path[0])} : ${value.message}`);
      });
    }
  }
})

test('Should support optional validation', () => {
  const registerSchema = z.object({
    firstname: z.string().min(3).max(100),
    lastname: z.string().min(3).max(100).optional()
  })

  const request = {
    firstname: 'eko'
  }

  const register = registerSchema.parse(request);

  expect(register).toEqual({
    firstname: 'eko',
  })
})

test('Should support transform validation', () => {

  //setelah berhasil divalidasi, transform akan dijalankan
  //firstname akan di transform bila sukses divalidasi
  const registerSchema = z.object({
    firstname: z.string().min(3).max(100).transform(value => value.toUpperCase())
  })

  const request = {
    firstname: 'eko'
  }

  const register = registerSchema.parse(request);

  expect(register).toEqual({
    firstname: 'EKO',
  })
})

test('Should support custom validation', () => {

  function mustUpperCase(value: string, ctx: RefinementCtx) {
    if (value != value.toUpperCase()) {
      ctx.addIssue({
        code: 'custom',
        message: "The username field must uppercase",
        input: value,
      })
      return z.NEVER;
    } else {
      return value;
    }
  }

  const registerSchema = z.object({
    firstname: z.string().min(3).max(100).transform(mustUpperCase)
  })

  const request = {
    firstname: 'EKO'
  }

  const register = registerSchema.parse(request);

  expect(register).toEqual({
    firstname: 'EKO',
  })
})