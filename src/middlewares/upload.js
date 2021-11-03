const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const nameFormat = `${file.fieldname}-${Date.now()}-${Math.floor(
      Math.random() * 1000 * 1000
    )}${path.extname(file.originalname)}`;
    cb(null, nameFormat);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExt = ["jpg", "png", "jpeg"];
  const isFileAccepted = fileExt.some((fileExt) =>
    path.extname(file.originalname).toLowerCase().includes(fileExt)
  );
  if (!isFileAccepted) {
    req.fileValidationError = "File format must be jpg, jpeg, or png!";
    return cb(null, false, new Error(req.fileValidationError));
  }
  return cb(null, true);
};

const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1000 * 1000 },
});

module.exports = { uploadImage };