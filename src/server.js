import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
import connection from "./configs/connectDB";
// Using dotenv package to read the .env variables
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

// Setup view engine.
configViewEngine(app);

// Init web route.
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
