import express from 'express';
import {
    userRegister,
    login
} from '../Controllers/authController.js';
import{ viewAllPublishedProducts, viewPublishedProduct} from "../Controllers/userControllers.js";
import { createProduct, updateProductById, getAllProducts, getAllUsers, getProductById, deleteProductById } from "../Controllers/adminController.js";
import { tokenVerify  } from '../middleware/tokenVerify.js';

const router= express.Router();
router.post('/register',userRegister);
router.post('/login', login);

router.post('/createproduct', tokenVerify, createProduct);
router.get('/getproducts', tokenVerify, getAllProducts);
router.get('/getproducts/:id', tokenVerify, getProductById);
router.put('/updateproduct/:id', tokenVerify, updateProductById);
router.delete('/deleteproduct/:id', tokenVerify, deleteProductById);

router.get('/getusers', tokenVerify, getAllUsers);

router.get('/viewallproduct', tokenVerify, viewAllPublishedProducts);
router.get('/viewsingleproduct/:id', tokenVerify,viewPublishedProduct);

export default router;