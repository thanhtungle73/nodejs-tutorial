import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router();

const initWebRoute = (app) => {
  // Trigger controller when the route match /
  router.get("/", homeController.getHomepage);

  // Trigger controller when the route match /about
  router.get("/about", (req, res) => {
    res.send("Hi, I'm Tung");
  });

  // parent route (path params start with '/').
  return app.use("/", router);
};

export default initWebRoute;
