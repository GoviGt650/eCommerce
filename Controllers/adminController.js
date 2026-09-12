import mongoose from "mongoose";
import User from "../Models/userModel.js";
import products from "../Models/productsModel.js";
import { Parser } from "json2csv";
export const createProduct = async ( req, res ) => {
    try {
        const { name, description, price, category, stock, published } = req.body;
        if( req.user.role !== "admin" ) {
            return res.status(400).json({
            message : "You are not authorized",
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
            error : err
        });
    }
}

export const getAllProducts = async ( req, res ) => {
    try {
        const { published, exportData } =req.query;
        const filter={}
        if (published !== undefined) {
            filter.published = published === 'true';
        }
        if( req.user.role === "user" ) {
            const product = await products.find({ published : true });
            return res.status(200).json( product );
        }
        if( req.user.role === "admin" && exportData === "csv" ) {
            const product = await products.find().lean();
            const jsonToCsv = new Parser({
                fields : [ "_id", "name", "description", "price", "category", "stock", "published"]
            });
            const csvData = jsonToCsv.parse(product);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename = products-data.csv')
            return res.status(200).send( csvData );
        }
        if( req.user.role === "admin"  ) {
            const product = await products.find(filter);
            return res.status(200).json( product );
        }
    } catch (err) {
        return res.status(400).json({
            message : "DB Error",
            error : err
        });       
    }
}

export const getAllUsers = async ( req, res ) => {
    try {
        if( req.user.role !== "admin" ) {
            return res.status(400).json({
            message : "You are not authorized",
        });
        }
        const users = await User.find({ role : "user" }).lean();
        const jsonToCsv = new Parser({
            fields : [ "_id", "name", "email", "role"]
        });
        const csvData = jsonToCsv.parse(users);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename = users-data.csv')
        return res.status(200).send( csvData );

    } catch (err) {
        return res.status(400).json({
            message : "DB Error",
            error : err.message
        });       
    }
}

export const updateProductById = async ( req, res ) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({
                message : "Invalid object id"
            });
        }
        const changes = {};
        if( req.body.name !== undefined ) {
            changes.name = req.body.name;
        }
        if( req.body.description !== undefined ) {
            changes.description = req.body.description;
        }
        if( req.body.price !== undefined ) {
            changes.price = req.body.price;
        }
        if( req.body.category !== undefined ) {
            changes.category = req.body.category;
        }
        if( req.body.stock !== undefined ) {
            changes.stock = req.body.stock;
        }
        if( req.body.published !== undefined ) {
            changes.published = req.body.published;
        }
        if( req.user.role !== "admin"){
            return res.status(400).json({
                message : "You are not authorised"
            });
        }
        const product = await products.findByIdAndUpdate(
            req.params.id,
            changes,
            {
                new : true,
                runValidators : true
            }
        );
        return res.status(201).json( product );
    } catch(err) {
        return res.status(400).json({
            message : "DB Error",
            error : err.message
        });         
    }
}

export const getProductById = async (req, res) => {
    try {
        if( !mongoose.isValidObjectId(req.params.id) ){
            return res.status(400).json({
                message : "Invalid Object Id"
            });
        }
        const product = await products.findById( req.params.id );
        if( !product ) {
            return res.status(400).json({
                message : "No product found"
            })
        }
        return res.status(200).json(product);
        
    } catch (err) {
        return res.status(400).json({
            message : "DB Error",
            error : err.message
        });  
    }
}

export const deleteProductById = async( req, res ) => {
    try {
        if( !mongoose.isValidObjectId(req.params.id) ){
            return res.status(400).json({
                message : "Invalid Object Id"
            });
        }
        if( req.user.role !== "admin"){
            return res.status(400).json({
                message : "You are not authorised"
            });
        }
        const product = await products.findByIdAndDelete( req.params.id );
        if( !product ) {
            return res.status(400).json({
                message : "No product found to delete"
            })
        }
        return res.status(200).json({
            product : product,
            message : "Prodct deleted successfully"
        });
    } catch ( err ) {
        return res.status(400).json({
            message : "DB Error",
            error : err.message
        });
    }
}

export const deleteUserById = async( req, res ) => {
    try {
        if( !mongoose.isValidObjectId(req.params.id) ){
            return res.status(400).json({
                message : "Invalid Object Id"
            });
        }
        if( req.user.role !== "admin"){
            return res.status(400).json({
                message : "You are not authorised"
            });
        }
        const user = await User.findByIdAndDelete( req.params.id );
        if( !user ) {
            return res.status(400).json({
                message : "No user found to delete"
            })
        }
        return res.status(200).json({
            user : user,
            message : "User deleted successfully"
        });
    } catch ( err ) {
        return res.status(400).json({
            message : "DB Error",
            error : err.message
        });
    }
}