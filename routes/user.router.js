const express= require('express');
const faker = require('faker');
const router=express.Router();
router.get('/',(req,res)=>{
    const usuarios=[];
    for (let index = 0; index <=5; index++) {
        usuarios.push({
            name : faker.name.firstName()
        })

    }
    res.json(usuarios)
})
module.exports=router;
