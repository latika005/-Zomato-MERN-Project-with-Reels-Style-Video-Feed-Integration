import multer from "multer";

const storage = multer.memoryStorage(); // 🔥 THIS is the key

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB (adjust if needed)
  },
});

export default upload;
