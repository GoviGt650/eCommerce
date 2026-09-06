import express from 'express';
import {
    userRegister,
    login
} from '../Controllers/authController.js';
import { createProduct } from '../controllers/adminController.js';

const router= express.Router();
router.post('/register',userRegister);
router.post('/login', login);
router.post('/createproduct', createProduct);
export default router;