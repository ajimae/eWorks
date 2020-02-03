import { config, uploader } from 'cloudinary';

const {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env;

const cloudinaryConfig = () => config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

export { cloudinaryConfig, uploader };

// import { config, uploader } from 'cloudinary'
// import dotenv from 'dotenv';
// dotenv.config();
// const cloudinaryConfig = (req, res, next) => {
// config({
// cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// api_key: process.env.CLOUDINARY_API_KEY,
// api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// next();
// }
// export { cloudinaryConfig, uploader };
