import express from 'express';
import productsRouter from './shop_routes/products.js';
import route_users from './shop_routes/users.js';
const port = process.env.PORT || 3000;
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// principal route
app.get("/", (req, res) => {
    res.send("server in");
});

// users routes
app.use('/users', route_users);

// products routes
app.use('/products', productsRouter);

//validation route not found
app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// listen server
app.listen(port, () => {
    console.log('Server listening on', port);
});