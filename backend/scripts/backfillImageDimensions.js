// scripts/backfillImageDimensions.js
import mongoose from "mongoose";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Post from "../models/post.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "production") {
  console.log("Running in Production mode");
  dotenv.config({ path: path.join(__dirname, "../../.env") });
} else {
  console.log("Running in Development mode");
  dotenv.config({ path: path.join(__dirname, "../../dev.env") });
}

// storage/ sits directly at the backend project root
const STATIC_ROOT = process.cwd();

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("Missing MONGO_URI in environment");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  const posts = await Post.find({
    $or: [
      { width: { $exists: false } },
      { height: { $exists: false } },
    ],
  });

  console.log(`Found ${posts.length} posts missing dimensions`);

  let updated = 0;
  let failed = 0;

  for (const post of posts) {
    const filePath = path.join(STATIC_ROOT, post.imgUrl);
    try {
      const metadata = await sharp(filePath).metadata();
      if (!metadata.width || !metadata.height) {
        throw new Error("sharp returned no width/height");
      }
      post.width = metadata.width;
      post.height = metadata.height;
      await post.save();
      updated++;
      console.log(`✓ ${post._id} — ${metadata.width}x${metadata.height} (${post.imgUrl})`);
    } catch (err) {
      failed++;
      console.error(`✗ ${post._id} (${post.imgUrl}) — ${err.message}`);
    }
  }

  console.log(`\nDone. Updated: ${updated}, Failed: ${failed}`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Script crashed:", err);
  process.exit(1);
});