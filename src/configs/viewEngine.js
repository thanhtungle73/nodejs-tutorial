import express from "express";

const configViewEngine = (app) => {
  // From configs folder go to public folder.
  app.use(express.static("./src/public"));
  // Config view engine is ejs.
  app.set("view engine", "ejs");
  // Config how to find views folder.
  app.set("views", "./src/views");
};

export default configViewEngine;
