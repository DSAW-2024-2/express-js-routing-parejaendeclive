import express from 'express';
import productsRouter from './shop_routes/products.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("Api funcionando correctamente");
});

// Rutas de productos
app.use('/products', productsRouter);

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});