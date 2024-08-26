const crudfuncs=require('./CRUDfile.js')
const express=require('express');
const app=express();
const port=8000;

app.listen(port,()=>{
    console.log('server started Successfull');
})



app.use(express.urlencoded({extended:false}))

app.route('/api/userss')
.get((req,res)=>{
    crudfuncs.getlist()
    .then(uList=>{
        console.log(uList);
        return res.json(uList);
    })


}).post((req,res)=>{
    const body=req.body;
    if(!body || !body.fullName || !body.email || !body.gender || !body.jobTitle){
        return res.status(400).json({Error:"one or more values missing"})
    }else{
        
        crudfuncs.addUser(body)
        .then(newUser=>{
            console.log(newUser)
            return res.status(201).json({task: 'new user add',newUser:newUser})
        })
        

    }
})