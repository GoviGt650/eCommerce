import express from 'express';
import {
    userRegister,
    login
} from '../Controllers/authController.js';
import { createProduct } from "../controllers/adminController.js";

const router= express.Router();
router.post('/register',userRegister);
router.post('/login', login);
router.post('/createproduct', tokenVerify, createProduct);
router.get('/getproducts', tokenVerify, getAllProducts);
router.get('/getusers', tokenVerify, getAllUsers);

export default router;