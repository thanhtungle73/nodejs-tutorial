import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
import initApiRoute from "./routes/api";
// Using dotenv package to read the .env variables
import "dotenv/config";
var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

// Showing log with morgan.
app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup view engine.
configViewEngine(app);

// Init web route.
initWebRoute(app);

// init api route.
initApiRoute(app);

// Return 404 Not Found Page.
app.use((req, res) => {
  return res.render("notFound.ejs");
});

app.use((req, res, next) => {
  // Check if not accessible => return  res.send()

  // check if accessible then next to below codes...
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
