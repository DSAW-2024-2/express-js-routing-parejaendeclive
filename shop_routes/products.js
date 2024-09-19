import express from 'express';
const products_router = express.Router();

// default products
export const products = [
    {
        id: "5",
        name: "phone",
        price: "1500000",
        category: "technology"
    },
    {
        id: "7",
        name: "rice",
        price: "10000",
        category: "food"
    }
];

//  GET products
products_router.get('/', (req, res) => {
    try {
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
});

// POST product
products_router.post('/', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        if (!id || !name || !price || !category) {
            return res.status(400).json({ message: "JSON de productos incompleto" });
        }
        if (products.some(p => p.id === id)) {
            return res.status(400).json({ message: "ID ya en uso" });
        }
        if (!/^\d+$/.test(id)) {
            return res.status(400).json({ message: "ID must be a valid number" });
        }
        if (!/^\d+$/.test(price)) {
            return res.status(400).json({ message: "price must be a valid number" });
        }
        products.push({ id, name, price, category });
        res.status(201).json({ message: "Producto agregado" });
    } catch (error) {
        res.status(500).json({ message: "Producto no agregado", error: error.message });
    }
});

// GET product by id
products_router.get('/:id', (req, res) => {
    try {
        const product = products.find(p => p.id === req.params.id);
        if (!product) {
            return res.status(404).json({ message: "ID de producto no existe" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Producto no encontrado", error: error.message });
    }
});

// PUT update product
products_router.put('/:id', (req, res) => {
    try {
        const { name, price, category } = req.body;
        
        const productId = req.params.id;
        
        if (!productId||!name || !price || !category) {
            return res.status(400).json({ message: "JSON de productos incompleto" });
        }
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        if (!/^\d+$/.test(productId)) {
            return res.status(400).json({ message: "ID must be a valid number" });
        }
        if (!/^\d+$/.test(price)) {
            return res.status(400).json({ message: "price must be a valid number" });
        }
        products[productIndex] = { ...products[productIndex],productId, name, price, category };
        res.json({ message: "Producto actualizado" });
    } catch (error) {
        res.status(500).json({ message: "Producto no actualizado", error: error.message });
    }
});

// DELETE product
products_router.delete('/:id', (req, res) => {
    try {
        const productIndex = products.findIndex(p => p.id === req.params.id);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        products.splice(productIndex, 1);
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Producto no eliminado", error: error.message });
    }
});

export default products_router;