
const mongoose=require('mongoose');

mongoose
.connect('mongodb://127.0.0.1:27017/MfirstDB')
.then(data=>{
    console.log('Mongo Connected');
})
.catch(err=>{
    console.log('an error occured: ',err);
})

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true,
    },gender:{
        type:String
    },jobTitle:{
        type:String,
    }
},{timestamps:true})

const userModel=mongoose.model('user',userSchema);

async function getlist() {
    try {
        const ulist = await userModel.find({});
        return ulist;
    } catch (err) {
        console.error('An error occurred while fetching the user list:', err);
    }
}

async function addUser(body){
    const newUser=new userModel({
        fullName:body.fullName,
        email:body.email,
        gender:body.gender,
        jobTitle:body.jobTitle,
    })
    const result=await newUser.save();
    return result;
}

async function getByid(id) {
    console.log(id);
    const user= await userModel.findById(id).exec();
    return user;
     
}

async function addbyid(id,body) {
    const user= await userModel.findByIdAndUpdate(id,{
        fullName:body.fullName,
        email:body.email,
        gender:body.gender,
        jobTitle:body.jobTitle,
    })

    return user;
}

async function deletebyid(id) {
    const user= await userModel.findByIdAndDelete(id);
    return user;
    
}
module.exports= {
    getlist:getlist,
    addUser:addUser,
    getbyid:getByid,
    addbyid:addbyid,
    deletebyid:deletebyid
}