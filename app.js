import express from "express";
import userRoutes from './Routes/userRoutes.js'
import authRoutes from './Routes/authRoutes.js';
import productRoutes from './Routes/productRoutes.js'
const app = express();
app.use(express.json());
app.use('/user', userRoutes);
app.use('/user/products', productRoutes);
app.use('/auth', authRoutes);
app.get('/', (req,res) => {
    res.send("Open the server on port URL http://localhost:3000");
});
export default app;