import express from "express";
import userRoutes from './Routes/userRoutes.js'
const app = express();
app.use(express.json());
app.use('/user', userRoutes);
app.get('/', (req,res) => {
    res.send("Open the server on port URL http://localhost:3000");
});
export default app;