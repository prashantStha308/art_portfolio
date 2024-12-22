import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import postRouter from "./routes/post.routes.js";
import projectRouter from "./routes/project.routes.js";

config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/api/post',postRouter);
app.use('/api/project', projectRouter);

app.listen( PORT , ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
} )