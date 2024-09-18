const express = require ('express');
const app = express();
const route_users = require('./shop_routes/users');
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/' , (req, res) =>{
    res.send("users server");
})
app.use('/users', route_users);

app.listen(port, () =>{
    console.log('server in', port);
})
