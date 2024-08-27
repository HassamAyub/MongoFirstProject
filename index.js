const crudfuncs=require('./CRUDfile.js')
const express=require('express');
const app=express();
const port=8000;

app.listen(port,()=>{
    console.log('server started Successfull');
})



app.use(express.urlencoded({extended:false}))


// get all users and post new user >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.route('/api/users')
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


// get,patch and delete user >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.route('/api/users/:id')
.get((req,res)=>{
    const userid = req.params.id;
    crudfuncs.getbyid(userid)
    .then(user=>{
        return res.status(200).json(user)})
    .catch(err=>{
        return res.status(404).json({error:"not found"})
        }
    )
    
})
.patch((req,res)=>{
    const body=req.body;
    crudfuncs.addbyid(req.params.id,body)
    .then(user=>{
        return res.status(200).json(user)
    })
})
.delete((req,res)=>{
    crudfuncs.deletebyid(req.params.id)
    .then(user=>{
        return res.status(200).json({task:`user deleted user:${user}`})
    })
})