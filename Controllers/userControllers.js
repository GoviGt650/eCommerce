import User from '../Models/userModel.js';
import products from '../Models/productsModel.js';

 export async function viewProducts(req,res){
    try{
        const products= await products.find({published:true});
        res.json(products);
    }
    catch(err){
        return res.status(500).json({message:"Database Error", Error:err.message});
    }
 }