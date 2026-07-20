// scripts/backfillDominantColor.js
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

const STATIC_ROOT = process.cwd();

// converts a 0-255 channel value to a 2-digit hex string
function toHex(value) {
  return Math.round(value).toString(16).padStart(2, "0");
}

async function getAverageColorHex(filePath) {
  const { channels } = await sharp(filePath).stats();
  // channels[0] = red, channels[1] = green, channels[2] = blue
  const [r, g, b] = channels;
  return `#${toHex(r.mean)}${toHex(g.mean)}${toHex(b.mean)}`;
}

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("Missing MONGO_URI in environment");
    process.exit(1);
  }

  const conn = await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
  console.log(`MongoDB Connected: ${conn.connection.host}`)

  // only backfill posts that still have the schema default,
  // since that means color was never actually computed
  const posts = await Post.find({
    $or: [
      { color: { $exists: false } },
      { color: "#ffffff" },
    ],
  });

  console.log(`Found ${posts.length} posts missing computed color`);

  let updated = 0;
  let failed = 0;

  for (const post of posts) {
    const filePath = path.join(STATIC_ROOT, post.imgUrl);
    try {
      const hex = await getAverageColorHex(filePath);
      post.color = hex;
      await post.save();
      updated++;
      console.log(`✓ ${post._id} — ${hex} (${post.imgUrl})`);
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