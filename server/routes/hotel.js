import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, hotelSeller } from "../middlewares";
// controllers
import {
  create,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
  update,
  userHotelBookings,
  isAlreadyBooked,
} from "../controllers/hotel";

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", image);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelSeller, remove);
router.get("/hotel/:hotelId", read);
router.put(
  "/update-hotel/:hotelId",
  requireSignin,
  hotelSeller,
  formidable(),
  update
);
// orders
router.get("/user-hotel-bookings", requireSignin, userHotelBookings);
router.get("/is-already-booked/:hotelId", requireSignin, isAlreadyBooked);

// User will be able to rate there stay at the property of the seller

module.exports = router;
