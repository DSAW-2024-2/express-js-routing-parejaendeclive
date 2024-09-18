const express = require ('express');
const app = express();
const route_users = express.Router();

//using required router

let users = [
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

]
//GET all users
route_users.get('/' , (req, res) =>{
    res.send(users);
})

//GET user by id //VALIDATIONS
route_users.get('/:id' , (req, res) =>{
    const id=req.params.id;
    const user = users.find(user => user.id === id); 
    if(!user){
        
        return res.status(404).send('User not found');
    }
    res.json(user);

})

//POST users //VALIDATIONS
route_users.post('/' , (req, res) =>{
    const {id,name, email , age} = req.body;
    //incomplete JSON
    try{
        if (!id || !name || !email || !age) {
            return res.status(400).json({ error: 'json incomplete' });
        }
        const new_user = {id, name, email, age};
        users.push(new_user);
        res.send(users);

    }catch(error){
        res.status(500).json({message:"user not added", error:error.message});
    }
})

//PUT users by id //VALIDATIONS
route_users.put('/:id' , (req, res) =>{
    const {name, email , age} = req.body;
    try{
        const id = req.params.id;
        const index = users.findIndex( i => i.id == id);
        if(index < 0 ){
            return res.status(404).send('Id user does not exist');
        }
        else if(!id || !name || !email || !age){
            return res.status(400).json({ error: 'json incomplete' }); 
        }
        const update_user={id,name,email,age};
        users[index] = update_user;
        res.send(users);
    }
    catch(error){
        res.status(500).json({message:"user not founded", error:error.message});
    }  
})
//DELETE user //VALIDATIONS
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


