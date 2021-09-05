import expressJwt from "express-jwt";

// req.user
export const requireSignin = expressJwt({
  // We need to verify the user certificates. In addition to validate for expiration date
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let seller = hotel.postedBy._id.toString() === req.user._id.toString();
  if (!seller) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
