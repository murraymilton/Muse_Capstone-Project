import expressJwt from "express-jwt";

// req.user
export const requireSignin = expressJwt({
  // We need to verify the user certificates. In addition to validate for expiration date
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
