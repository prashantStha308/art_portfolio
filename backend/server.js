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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use('/storage/images', express.static(path.join(__dirname, 'storage/images')));

app.use('/api/post', postRouter);
app.use('/api/project', projectRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
});
