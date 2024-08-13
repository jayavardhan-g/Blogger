const mongoose = require('mongoose')
const {Schema, model} = mongoose


const UserSchema = new Schema({
    username:{type:String, unique:true, minlength:4,maxlength:15, required:true },
    email:{type:String, unique:true,required:true},
    password:{type:String,minlength:5, required:true},
    saved:[{type:Schema.Types.ObjectId,ref:'Blog'}],
    own:[{type:Schema.Types.ObjectId,ref:'Blog'}]
})

const UserModel = model("User",UserSchema)
module.exports = UserModel

//mongodb+srv://itsmellucas:itsmellucas@blogs0.dzmasj2.mongodb.net/?retryWrites=true&w=majority&appName=Blogs0
//ICVrIffVE2A5u1Ol