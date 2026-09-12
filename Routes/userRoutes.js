import express from 'express';
import {
    userRegister,
    login
} from '../Controllers/authController.js';

import {
    viewAllPublishedProducts,
    viewPublishedProduct
} from "../Controllers/userControllers.js";

import { 
    createProduct,
    getAllProducts,
    
} from "../Controllers/adminController.js";


// import {authMiddleware} from "../middleware/authMiddleware.js";
import { tokenVerify } from '../middleware/tokenVerify.js';

const router= express.Router();
router.post('/register',userRegister);
router.post('/login', login);

router.post('/createproduct', tokenVerify, createProduct);
router.get('/getproducts', tokenVerify, getAllProducts);
// router.get('/getusers', tokenVerify, getAllUsers);

router.get('/viewAllProduct', tokenVerify, viewAllPublishedProducts);
router.get('/viewsingleProduct/:id', tokenVerify, viewPublishedProduct);

export default router;