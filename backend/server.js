import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import { connectDB } from "./config/db.js";
import postRouter from "./routes/post.routes.js";
import projectRouter from "./routes/project.routes.js";

config();
const PORT = process.env.PORT;
const app = express();

// Get the current directory path
const __dirname = path.resolve();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use('/storage/images', express.static(path.join(`${__dirname}/backend/`, 'storage/images')));
app.use('/storage/thumbnails', express.static(path.join(`${__dirname}/backend/`, 'storage/thumbnails')));

app.use('/api/post', postRouter);
app.use('/api/project', projectRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get( "*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    } )
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
});
