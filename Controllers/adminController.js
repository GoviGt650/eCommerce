import User from "../Models/userModel.js";
import mongoose from "mongoose";
import products from "../Models/productsModel.js";
export const createProduct = async ( req, res ) => {
    try {
        const {  name, description, price, category, stock, published } = req.body;
        if( req.user.role !== admin ) {
            return res.status(400).json({
            message : "You are not authorized",
            error : err.message
        });
        }
        const product = await products.create({
             name,
             description,
             price,
             category,
             stock,
             published
        });
        return res.status(201).json({
            message : "Product Created",
            productDetails : product 
        });
    } catch (err) {
        return res.status(400).json({
            message : "DB Error",
            error : err.message
        });
    }
}