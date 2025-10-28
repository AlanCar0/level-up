// test/ejemplo.test.js
describe('Calculadora', () => {
    it('debería sumar números correctamente', () => {
        const suma = (a, b) => a + b;
        expect(suma(2, 3)).toBe(5);
    });
    
    it('debería verificar valores booleanos', () => {
        expect(true).toBe(true);
    });
});