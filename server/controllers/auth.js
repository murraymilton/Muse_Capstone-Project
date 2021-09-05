import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, username, email, password } = req.body;
  // USER VAlidation: Source for learning : Anson the Developer (Youtube)
  // Managing User Roles Pedro Tech
  if (!firstname) return res.status(400).send("Firstname is required");
  if (!lastname) return res.status(400).send("Lastname is required");
  if (!username) return res.status(400).send("Username is required");
  if (!email) return res.status(400).send("Email is required");
  if (!password || password.length < 7)
    return res
      .status(400)
      .send("Password is required minimum of 7t character needed");
  let userExist = await User.findOne({ email }).exec();
  if (userExist)
    return res.status(400).send("Email is taken: Please provide a valid email");
  // let nameUser = await User.findOne({ username }).exec();
  // if (nameUser)
  //   return res
  //     .status(400)
  //     .send("Username is taken: Please provide a valid username");

  const user = new User(req.body);
  try {
    await user.save();
    console.log("CREATED USER:", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log("Account Creation Failure", error);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    // Will
    let user = await User.findOne({ email }).exec();
    console.log("USER EXIST", user);
    if (!user)
      res
        .status(400)
        .send(
          "There is no account listed under that name: To Register return to Homepage"
        );
    user.comparePassword(password, (error, match) => {
      console.log("PASSWORD ERROR: PLEASE REVIEW YOUR ENTRY", error);
      if (!match || error) return res.status(400).send("Incorrect Password");
      // console.log("HASHTOKEN:THEN RETURN TO ENDUSER");
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (error) {
    console.log("Bad Authentication:", error);
    res.status(400).send("Signin failed");
  }
};
