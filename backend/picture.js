import multer from "multer";

const imagesDir = './backend/storage/images';
const thumbDirt = './backend/storage/thumbnails';

// Configure multer
export const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        cb(null, "user-" + Date.now() + file.originalname);
    }
});
export const upload = multer({ storage: postStorage });

export const thumbnail = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, thumbDirt);
    },
    filename: function (req, file, cb) {
        cb(null, "user-" + Date.now() + file.originalname);
    }
});
export const thumbStorage = multer({storage: thumbnail});