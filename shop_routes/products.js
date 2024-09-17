import express from 'express';
const router = express.Router();

// Simulación de datos en memoria con la estructura solicitada
let products = [
    { id: "1", name: "Laptop", price: "1200", category: "Electronics" },
    { id: "2", name: "Phone", price: "800", category: "Electronics" }
];

// Ruta GET para obtener todos los productos
router.get('/', (req, res) => {
    try {
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
});

// Ruta POST para agregar un nuevo producto
router.post('/', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        if (!id || !name || !price || !category) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        products.push({ id, name, price, category });
        res.status(201).json({ message: "Producto agregado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el producto", error: error.message });
    }
});

// Ruta GET para obtener un producto por ID
router.get('/:id', (req, res) => {
    try {
        const product = products.find(p => p.id === req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error: error.message });
    }
});

// Ruta PUT para actualizar un producto
router.put('/:id', (req, res) => {
    try {
        const { name, price, category } = req.body;
        const productIndex = products.findIndex(p => p.id === req.params.id);
        
        if (productIndex === -1) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        products[productIndex] = { ...products[productIndex], name, price, category };
        res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
    }
});

// Ruta DELETE para eliminar un producto
router.delete('/:id', (req, res) => {
    try {
        const productIndex = products.findIndex(p => p.id === req.params.id);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        products.splice(productIndex, 1);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
    }
});

export default router;
