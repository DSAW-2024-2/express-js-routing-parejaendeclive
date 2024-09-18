const express = require ('express');
const app = express();
const route_users = express.Router();

//using required router

let users = [

]
//GET all users
route_users.get('/' , (req, res) =>{
    res.send(users);
})

//POST users
route_users.post('/' , (req, res) =>{
    const new_user = req.body;
    
    users.push(new_user);
    res.send(users);
})

//PUT users by id
route_users.put('/:id' , (req, res) =>{
    const update_user = req.body;
    const id = req.params.id;
    const index = users.findIndex( i => i.id == id);

    if(index < 0){
        return res.status(404).send('User not found');
    }
    
    users[index] = update_user;
    res.send(users);
    
})
//DELETE user
route_users.delete('/:id' , (req, res) =>{
    
    const id = req.params.id;
    const index = users.findIndex( i => i.id == id);

    if(index < 0){
        return res.status(404).send('User not found');
    }
    
    users.splice(index, 1);
    res.send(users);
    
})



module.exports= route_users;


