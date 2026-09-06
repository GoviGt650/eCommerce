import { connectDB } from "./config/db.js";
import app from "./app.js";
import "dotenv/config";
<<<<<<< HEAD
import { connectDB } from "./config/db.js";

const port = process.env.DB_PORT;
async function start() {
    await connectDB ();
=======

const port = process.env.DB_PORT;
async function start() {
    await connectDB();
>>>>>>> 4a8cd53025c11f807fec6ca9f5bb48415a47ddba
    app.listen(port, () => {
        try {
            console.log("Server Running");
            console.log("Open the server on port", port , "URL http://localhost:3000")
        } catch(err) {
            console.log("Connection failed");
            console.error(err.message);
            process.exit(1);
        }
    });
}
start();