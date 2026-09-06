import express from "express";
const app = express();
app.use(express.json());
app.get('/', (req,res) => {
    res.send("Open the server on port URL http://localhost:3000");
});

export default app;