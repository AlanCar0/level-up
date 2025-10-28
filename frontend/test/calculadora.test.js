// test/calculadora.test.js
describe('Calculadora básica', () => {
    it('debería sumar números correctamente', () => {
        const calculadora = {
            sumar: (a, b) => a + b,
            restar: (a, b) => a - b
        };
        
        expect(calculadora.sumar(2, 3)).toBe(5);
        expect(calculadora.restar(5, 2)).toBe(3);
    });
    
    it('debería manejar strings', () => {
        const texto = "Hola Mundo";
        expect(texto).toContain("Hola");
    });
    
    it('debería verificar tipos de datos', () => {
        expect(typeof 42).toBe('number');
        expect(typeof "texto").toBe('string');
        expect(typeof true).toBe('boolean');
    });
});