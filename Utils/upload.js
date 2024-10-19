const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Function to create and return multer upload middleware
function upload(directory) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `public/img/uploads/${directory}`;

      // Check if the uploads directory exists and create it if it doesn't
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });

  return multer({ storage: storage });
}

module.exports = upload;
