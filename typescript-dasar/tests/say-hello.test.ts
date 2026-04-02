import { sayHello } from "../src/say-hello";

describe('sayHello', () => {
  it('should say hello', function () {
    expect(sayHello('Eko')).toBe('Hello Eko');
  });
});