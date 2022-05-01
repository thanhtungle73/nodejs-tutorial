import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
import initApiRoute from "./routes/api";
// Using dotenv package to read the .env variables
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup view engine.
configViewEngine(app);

// Init web route.
initWebRoute(app);

// init api route.
initApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
