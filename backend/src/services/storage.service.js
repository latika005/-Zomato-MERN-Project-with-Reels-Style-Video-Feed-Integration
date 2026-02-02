import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";
dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, fileName) {
  try {
    const response = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName,
    });

    return response;

  } catch (error) {
    console.error("ImageKit upload failed:", error);
    throw error;
  }
}

export default uploadFile;
