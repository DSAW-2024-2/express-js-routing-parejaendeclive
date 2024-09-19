import express from 'express';
const ordersRouter = express.Router();

// orders default
let orders = [
    {
        id: "1",
        userId: "5",
        productId: "7",
        quantity: 2,
        status: "pending"
    }
];

// Example users and products for validation
let users = [
    { id: "5", name: "John", email: "john@example.com", age: 30 }
];

let products = [
    { id: "7", name: "Rice", price: 10000, category: "food" }
];

// GET all orders
ordersRouter.get('/', (req, res) => {
    try {
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pedidos", error: error.message });
    }
});

// POST add order
ordersRouter.post('/', (req, res) => {
    try {
        const { id, userId, productId, quantity, status } = req.body;

        // Validating required fields
        if (!id || !userId || !productId || !quantity || !status) {
            return res.status(400).json({ message: "Order JSON incomplete" });
        }

        // Validating if userId and productId exist
        const userExists = users.some(u => u.id === userId);
        const productExists = products.some(p => p.id === productId);
        
        if (!userExists) {
            return res.status(400).json({ message: "User ID does not exist" });
        }
        if (!productExists) {
            return res.status(400).json({ message: "Product ID does not exist" });
        }

        // Checking if the order ID already exists
        if (orders.some(o => o.id === id)) {
            return res.status(400).json({ message: "Order ID already in use" });
        }

        // Adding the new order
        orders.push({ id, userId, productId, quantity, status });
        res.status(201).json({ message: "Order added" });
    } catch (error) {
        res.status(500).json({ message: "Order not added", error: error.message });
    }
});

// GET order by id
ordersRouter.get('/:id', (req, res) => {
    try {
        const order = orders.find(o => o.id === req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Order not found", error: error.message });
    }
});

export default ordersRouter;
