import express from 'express';
const products_router = express.Router();

// products default
let products = [
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

// POST add product
products_router.post('/', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        if (!id || !name || !price || !category) {
            return res.status(400).json({ message: "products json incomplete" });
        }
        if (products.some(p => p.id === id)) {
            return res.status(400).json({ message: "ID already in use" });
        }
        products.push({ id, name, price, category });
        res.status(201).json({ message: "product added" });
    } catch (error) {
        res.status(500).json({ message: "product not added", error: error.message });
    }
});

// GET products by id
products_router.get('/:id', (req, res) => {
    try {
        const product = products.find(p => p.id === req.params.id);
        if (!product) {
            return res.status(404).json({ message: "product Id does not exist" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "product not founded", error: error.message });
    }
});

// PUT update products
products_router.put('/:id', (req, res) => {
    try {
        const { name, price, category } = req.body;
        const productIndex = products.findIndex(p => p.id === req.params.id);
        
        if (productIndex === -1) {
            return res.status(404).json({ message: "product not founded" });
        }
        if (products.some(p => p.id === productId && p.id !== productId)) {
            return res.status(400).json({ message: "ID already in use" });
        }

        products[productIndex] = { ...products[productIndex], name, price, category };
        res.json({ message: "Product updated" });
    } catch (error) {
        res.status(500).json({ message: "product not updated", error: error.message });
    }
});

// DELETE products
products_router.delete('/:id', (req, res) => {
    try {
        const productIndex = products.findIndex(p => p.id === req.params.id);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not founded" });
        }
        products.splice(productIndex, 1);
        res.json({ message: "Removed product" });
    } catch (error) {
        res.status(500).json({ message: "product not removed", error: error.message });
    }
});

export default products_router;