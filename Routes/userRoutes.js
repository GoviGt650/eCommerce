import express from 'express';
import {
    userRegister,
    login
} from '../Controllers/authController.js';

const router= express.Router();
router.post('/register',userRegister);
router.post('/login', login);
export default router;