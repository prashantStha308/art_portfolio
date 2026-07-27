import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "production") {
    console.log("Running in Production mode");
    config({ path: join(__dirname, "../../.env") });
} else {
    console.log("Running in Development mode");
    config({ path: join(__dirname, "../../dev.env") });
}

config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_ENV_VARIABLE = process.env.CLOUDINARY_ENV_VARIABLE;

// GITHUB
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;