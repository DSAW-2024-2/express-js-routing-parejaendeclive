import express from 'express';
import { users } from './users.js';  // Importa la lista de usuarios
import { products } from './products.js';  // Importa la lista de productos

const orders_router = express.Router();

// Lista de pedidos por defecto
let orders = [];

// GET todos los pedidos
orders_router.get('/', (req, res) => {
    res.json(orders);
});

// POST para agregar un nuevo pedido
orders_router.post('/', (req, res) => {
    let { id, userId, productId, quantity, status } = req.body;

    // Convertir cantidad a string
    quantity = String(quantity);

    // Validación de JSON incompleto
    if (!id || !userId || !productId || !quantity || !status) {
        return res.status(400).json({ message: "Orden JSON incompleto" });
    }
    if (!/^\d+$/.test(quantity)) {
        return res.status(400).json({ message: "quantity must be a valid number" });
    }

    // Verificar si el usuario existe
    const userExists = users.find(user => user.id === userId);
    if (!userExists) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el producto existe
    const productExists = products.find(product => product.id === productId);
    if (!productExists) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Si las validaciones pasan, agregar la orden
    const newOrder = { id, userId, productId, quantity, status };
    orders.push(newOrder);
    res.status(201).json({ message: "Orden creada exitosamente"});
});

// GET para obtener un pedido por id
orders_router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(order);
});

// Exportar el router de órdenes
export default orders_router;