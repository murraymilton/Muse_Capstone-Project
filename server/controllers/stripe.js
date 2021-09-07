import User from "../models/user";
import Stripe from "stripe";
import queryString from "query-string";
import Hotel from "../models/hotel";
import Order from "../models/order";

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  // Confirm user is in the database.
  const user = await User.findById(req.user._id).exec();
  console.log("USER ==> ", user);
  // When running the live testing, lets console log to ensure the stripe id is passed
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    console.log("ACCOUNT ===> ", account);
    user.stripe_account_id = account.id;
    user.save();
  }
  // Verify the link is passed in the on-boarding of the new seller
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });
  // The object is used here for the given users email which now in our database to be pre-populate to stripe
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  // console.log("ACCOUNT LINK", accountLink);
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log("The Login Link for your the user:", link);
  res.send(link);
  // We will implement here the payout options for the sellers and promoters
};

const updateDelayDays = async (accountId) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

export const getAccountStatus = async (req, res) => {
  // Verifed the balance of due in customer account log. via JSON.stringify
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  // console.log("User Account Info:", account);
  // The delay of payment for the end-user needs to be verified with final check on 7th September before Heroku Launch
  const updatedAccount = await updateDelayDays(account.id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  // The user was updated, last verified on the 3rd of September check on the 7th for final test
  res.json(updatedUser);
};
export const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.user._id).exec();

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    // console.log("Return the balance of the user:", balance);
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

export const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();

    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
    );
    // console.log("LOGIN LINK FOR PAYOUT SETTING", loginLink);
    res.json(loginLink);
  } catch (err) {
    console.log("There was an error completing your payment process ", err);
  }
};
export const stripeSessionId = async (req, res) => {
  // console.log("you hit stripe session id", req.body.hotelId);
  // 1 get hotel id from req.body
  const { hotelId } = req.body;
  // 2 find the hotel based on hotel id from db
  const item = await Hotel.findById(hotelId).populate("postedBy").exec();
  // 3 20% charge as application fee
  const fee = (item.price * 20) / 100;
  // 4 create a session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // 5 purchasing item details, it will be shown to user on checkout
    line_items: [
      {
        name: item.title,
        amount: item.price * 100, // in cents
        currency: "usd",
        quantity: 1,
      },
    ],
    // 6 create payment intent with application fee and destination charge 80%
    payment_intent_data: {
      application_fee_amount: fee * 100,
      // this seller can see his balance in our frontend dashboard
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },
    // We will wait to verify the success of the payment
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });
  console.log("session:", session);

  // 7 add this session object to user in the db
  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();
  // 8 send session id as resposne to frontend
  res.send({
    sessionId: session.id,
  });
};
export const stripeSuccess = async (req, res) => {
  try {
    const { hotelId } = req.body;

    const user = await User.findById(req.user._id).exec();
    // If the user does not have a strip account we need to have them create in the session launch
    if (!user.stripeSession) return;
    // The token in the db used to create the stripe sessions
    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    );
    // We want to verify the payment here and then only prepare the order, if no payment is true, we will redirect the user for payment
    if (session.payment_status === "paid") {
      const orderExist = await Order.findOne({
        "session.id": session.id,
      }).exec();
      if (orderExist) {
        //If the order is present or exsit,, lets give it a status of true
        res.json({ success: true });
      } else {
        // Here we are awaiting then creating a new order for the user: Verify on 7th September final test for order schema
        let newOrder = await new Order({
          hotel: hotelId,
          session,
          orderedBy: user._id,
        }).save();
        // After the update to payment end the session and user should be re-direct to localhost 3000.
        await User.findByIdAndUpdate(user._id, {
          $set: { stripeSession: {} },
        });
        res.json({ success: true });
      }
    }
  } catch (err) {
    console.log("Stripe Authorization error:", err);
  }
};
