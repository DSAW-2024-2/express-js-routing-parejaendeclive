const express = require ('express');
const app = express();
const users = require('./shop_routes/users');

//using required router
const route_users = express.Router();
app.use('/users', route_users);

const port = process.env.PORT || 3000;

app.get('/' , (req, res) =>{
    res.send("users server");
})

route_users.get('/' , (req, res) =>{
    res.send(users);
})

app.listen(port, () =>{
    console.log('server in', port);
})
