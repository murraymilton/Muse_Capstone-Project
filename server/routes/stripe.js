import express from "express";

const router = express.Router();

//controllers
import { createConnectAccount, getAccountStatus } from "../controllers/stripe";
import { requireSignin } from "../middlewares";

//Our Middleware here requireSignin is protecting the route here
router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);

module.exports = router;
