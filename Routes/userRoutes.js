import express from 'express';
import {
    userRegister,
    login
} from '../Controllers/authController.js';
import{ viewAllPublishedProducts, viewPublishedProduct} from "../Controllers/userControllers.js";
import { createProduct, updateProductById, getAllProducts, getAllUsers, getProductById, deleteProductById, deleteUserById } from "../Controllers/adminController.js";
import { tokenVerify  } from '../middleware/tokenVerify.js';

const router= express.Router();
router.post('/register',userRegister);
router.post('/login', login);

router.post('/createproduct', tokenVerify, createProduct);
router.get('/getproducts', tokenVerify, getAllProducts);
router.get('/getproducts/:id', tokenVerify, getProductById);
router.get('/getusers', tokenVerify, getAllUsers);
router.put('/updateproduct/:id', tokenVerify, updateProductById);
router.delete('/deleteproduct/:id', tokenVerify, deleteProductById);

router.get('/viewAllProduct', tokenVerify, viewAllPublishedProducts);
router.get('/viewsingleProduct/:id', tokenVerify,viewPublishedProduct);
router.delete('/deleteuser/:id', tokenVerify, deleteUserById);

export default router;