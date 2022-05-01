import express from "express";
import apiController from "../controllers/apiController";
const router = express.Router();

const initApiRoute = (app) => {
  // Api method GET
  router.get("/users", apiController.getAllUsers);
  router.post("/create-user", apiController.createNewUser);
  router.put("/update-user", apiController.updateUser);
  router.delete("/delete-user/:userId", apiController.deleteUser);

  // parent route (path params start with '/').
  return app.use("/api/v1/", router);
};

export default initApiRoute;
