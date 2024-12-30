import multer from "multer";

const imagesDir = './backend/storage/images';

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
