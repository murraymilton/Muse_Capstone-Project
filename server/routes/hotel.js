import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//Applying middlewares
import { requireSignin } from "../middlewares";

//controllers
import { create, hotels } from "../controllers/hotel";
//We is use the formidable() functiont to handle the form request to our DB
router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
module.exports = router;
