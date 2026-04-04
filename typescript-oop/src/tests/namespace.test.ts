import { MathUtil } from "../math-util";
import { Eko } from "../math-util";

describe('Namespace', () => {
    it('should demonstrate namespace', () => {
        expect(MathUtil.sum(1, 2)).toBe(3);
        expect(MathUtil.PI).toBe(3.141592653589793);
        expect(Eko.name).toBe('Eko');
        expect(Eko.age).toBe(30);
    });
})