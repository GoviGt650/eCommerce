import mongoose from "mongoose";
import User from "../Models/userModel.js";
import products from "../Models/productsModel.js";
import { Parser } from "json2csv";
export const createProduct = async ( req, res ) => {
    try {
        const {  name, description, price, category, stock, published } = req.body;
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
        if( req.user.role === "user" ) {
            const product = await products.find({ published : true });
            return res.status(200).json( product );
        }
        if( req.user.role === "admin" ) {
            const product = await products.find();
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