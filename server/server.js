import express from "express";
require("dotenv").config();
const morgan = require("morgan");
import cors from "cors";
import mongoose from "mongoose";
import { readdirSync } from "fs";

const app = express();

// Database Route
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is now Connect: Site is now Live"))
  .catch(() => console.log("Database Connection Error:", error));

//Middlewares
app.use(cors()); //Resolves our conflict origin between ports
app.use(morgan("dev"));
app.use(express.json());

//Routing Middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.nextTick.PORT || 8000;

app.listen(port, () => console.log(`Server is running on Port ${port}`));
