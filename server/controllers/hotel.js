import Hotel from "../models/hotel";
import Order from "../models/order";
import User from "../models/user";
import fs from "fs";

export const create = async (req, res) => {
  //   console.log("req.fields", req.fields);
  //   console.log("req.files", req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;
    // handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if (err) {
        console.log("saving hotel err => ", err);
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const hotels = async (req, res) => {
  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id firstname lastname")
    .exec();
  // console.log(all);
  res.json(all);
};

export const image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id firstname lastname")
    .exec();
  // console.log(all);
  res.send(all);
};

export const remove = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json({ removed });
};

export const read = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy", "_id firstname lastname")
    .select("-image.data")
    .exec();
  console.log("The hotel was longed for you", hotel);
  res.json(hotel);
};

export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    }).select("-image.data");

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Hotel update failed. Try again.");
  }
};
export const userHotelBookings = async (req, res) => {
  const all = await Order.find({ orderedBy: req.user._id })
    .select("session")
    .populate("hotel", "-image.data")
    .populate("orderedBy", "_id firstname lastname")
    .exec();
  res.json(all);
};

export const isAlreadyBooked = async (req, res) => {
  const { hotelId } = req.params;
  // Return all orders of the user for review and compare which order have been purchases by the user.
  const userOrders = await Order.find({ orderedBy: req.user._id })
    .select("hotel")
    .exec();
  // Lets check to see if the hotel id is found in user order history
  let ids = [];
  for (let i = 0; i < userOrders.length; i++) {
    ids.push(userOrders[i].hotel.toString());
  }
  //We are using the includes to get our true or false for user order history
  res.json({
    ok: ids.includes(hotelId),
  });
};

export const hotelReview = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const user = await User.findOne({ _id: req.user._id });
    const { star } = req.body;

    //The user that will be updating the listing from the property holder
    let existingRatingObject = hotel.ratings.find(
      (ele) => ele.postedBy.toString() === user._id.toString()
    );

    // console.log("existingRatingObject==>>", existingRatingObject);

    //if user has not left a rating yet, push it
    if (existingRatingObject) {
      const ratingUpdated = await Hotel.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject },
        },
        { $set: { "ratings.$.star": star } },
        { new: true }
      ).exec();
      // console.log("ratingUpdated:", ratingUpdated);
      res.json(ratingUpdated);
    } else {
      let ratingAdded = await Hotel.findByIdAndUpdate(
        req.params.hotelId,
        {
          $push: { ratings: { star, postedBy: user._id } },
        },
        { new: true }
      ).exec();
      // console.log("ratingAdded:", ratingAdded);
      res.json(ratingAdded);
    }
  } catch (err) {
    console.log("an errr occ==>>", err);
    res.status(400).send(err);
  }
};
