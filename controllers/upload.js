const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/pictures");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: 10 * 1024 * 1024,
});

module.exports = upload;
