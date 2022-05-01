import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router();

const initWebRoute = (app) => {
  // Trigger controller when the route match /
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.getEditPage);
  router.post("/update-user", homeController.postUpdateUser);
  // Trigger controller when the route match /about
  router.get("/about", (req, res) => {
    res.send("Hi, I'm Tung");
  });

  // parent route (path params start with '/').
  return app.use("/", router);
};

export default initWebRoute;
