import express from "express";
import formidable from "express-formidable-v2";

const router = express.Router();

//Applying middlewares
import { requireSignin } from "../middlewares";

//controllers
import { create } from "../controllers/hotel";

router.post("/create-hotel", requireSignin, formidable(), create);

module.exports = router;
