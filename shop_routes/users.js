import express from 'express';
const route_users = express.Router();

// Lista de usuarios por defecto
export let users = [
    {
        id: "2",
        name: "Andre",
        email: "Andre@gmail.com",
        age: "19"
    },
    {
        id: "3",
        name: "samu",
        email: "samu@gmail.com",
        age: "18"
    }
];

// GET todos los usuarios
route_users.get('/', (req, res) => {
    res.json(users);
});

// GET usuario por id
route_users.get('/:id', (req, res) => {
    const user = users.find(user => user.id === req.params.id); 
    if (!user) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.json(user);
});

// POST agregar usuario
route_users.post('/', (req, res) => {
    const { id, name, email, age } = req.body;
    if (!id || !name || !email || !age) {
        return res.status(400).json({ error: 'JSON incompleto' });
    }
    if (users.some(u => u.id === id)) {
        return res.status(400).json({ message: "ID ya en uso" });
    }
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: "ID must be a valid number" });
    }
    if (!/^\d+$/.test(age)) {
        return res.status(400).json({ message: "age must be a valid number" });
    }
    
    
    const new_user = { id, name, email, age };
    users.push(new_user);
    res.send(users);
});

// PUT actualizar usuario
route_users.put('/:id', (req, res) => {
    const { name, email, age } = req.body;
    const id = req.params.id;
    const index = users.findIndex(i => i.id === id);
    if (index < 0) {
        return res.status(404).send('ID de usuario no existe');
    }
    if (!id || !name || !email || !age) {
        return res.status(400).json({ error: 'JSON incompleto' }); 
    }
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: "ID must be a valid number" });
    }
    if (!/^\d+$/.test(age)) {
        return res.status(400).json({ message: "age must be a valid number" });
    }
    const update_user = { id, name, email, age };
    users[index] = update_user;
    res.send(users);
});

// DELETE usuario
route_users.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(i => i.id === id);
    if (index < 0) {
        return res.status(404).send('Usuario no encontrado');
    }
    users.splice(index, 1);
    res.send(users);
});

export default route_users;
