const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const BlogSchema = new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    tags:{type:[String],required:true},
    image:{type:String},
    author:{type:Schema.Types.ObjectId,ref:'User',required:true}
},{
    timestamps:true
})

const BlogModel = model("Blog",BlogSchema)

module.exports = BlogModel