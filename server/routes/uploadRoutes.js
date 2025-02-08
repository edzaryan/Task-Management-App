import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return res.status(500).json({ error: "Upload failed" });
                }
                res.json({ imageUrl: result.secure_url });
            }
        ).end(req.file.buffer);

    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
