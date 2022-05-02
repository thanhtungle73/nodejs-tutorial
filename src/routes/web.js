import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router();
import multer from "multer";
var appRoot = require("app-root-path");
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// 'profile_pic' is the name of our file input field in the HTML form
let upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

const initWebRoute = (app) => {
  // Trigger controller when the route match /
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.getEditPage);
  router.post("/update-user", homeController.postUpdateUser);
  router.get("/upload", homeController.getUploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  // Trigger controller when the route match /about
  router.get("/about", (req, res) => {
    res.send("Hi, I'm Tung");
  });

  // parent route (path params start with '/').
  return app.use("/", router);
};

export default initWebRoute;
