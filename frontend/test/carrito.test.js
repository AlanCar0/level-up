// test/carrito.test.js
describe('Lógica del Carrito de Compras', () => {
  
  let productos = [
    { id: 1, name: "Producto 1", price: 10000, stock: 5 },
    { id: 2, name: "Producto 2", price: 20000, stock: 3 }
  ];

  describe('Gestión del carrito', () => {
    it('debería agregar producto al carrito', () => {
      const carrito = [];
      const producto = productos[0];
      
      // Simular agregar al carrito
      const nuevoCarrito = [...carrito, { ...producto, quantity: 1 }];
      
      expect(nuevoCarrito.length).toBe(1);
      expect(nuevoCarrito[0].id).toBe(1);
      expect(nuevoCarrito[0].quantity).toBe(1);
    });

    it('debería incrementar cantidad si producto ya está en carrito', () => {
      const carrito = [{ ...productos[0], quantity: 1 }];
      
      // Simular incrementar cantidad
      const nuevoCarrito = carrito.map(item =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      );
      
      expect(nuevoCarrito[0].quantity).toBe(2);
    });

    it('debería calcular total correctamente', () => {
      const carrito = [
        { ...productos[0], quantity: 2 }, // 2 * 10000 = 20000
        { ...productos[1], quantity: 1 }  // 1 * 20000 = 20000
      ];
      
      const total = carrito.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      expect(total).toBe(40000);
    });
  });

  describe('Validación de stock', () => {
    it('debería verificar stock disponible', () => {
      const producto = productos[0];
      const carrito = [{ ...producto, quantity: 2 }];
      
      const stockDisponible = producto.stock - carrito[0].quantity;
      
      expect(stockDisponible).toBe(3);
    });

    it('debería impedir agregar más del stock disponible', () => {
      const producto = productos[0];
      const carrito = [{ ...producto, quantity: 5 }]; // Stock máximo
      
      const puedeAgregarMas = carrito[0].quantity < producto.stock;
      
      expect(puedeAgregarMas).toBe(false);
    });
  });
});