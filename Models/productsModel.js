import mongoose from 'mongoose';
const productSchema=new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:Mongoose.Schema.Type.Mixed, required:true},
    stock:{type:Number, required:true},
    published:{type:Boolean, required:true}
},
{
    timestamps:true
}
);
const products=new mongoose.model('Product', productSchema);
export default products;