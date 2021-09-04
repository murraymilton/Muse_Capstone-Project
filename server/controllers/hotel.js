import Hotel from "../models/hotel";
import fs from "fs";

export const create = async (req, res) => {
  // console.log("req.fields", req.fields);
  // console.log("req.files", req.files);

  try {
    let fields = req.fields;
    let files = req.files;
    let hotel = new Hotel(fields);
    // Reslove image conflicts
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }
    hotel.save((error, result) => {
      if (error) {
        console.log("The creation of your Hotel could not be created:", error);
        res.status(400).send("Error while saving");
      }
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

export const hotels = async (req, res) => {
  // Here we are only asking for the data, not the image, image display front-end afterwards
  let all = await Hotel.find({})
    .limit(30)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.json(all);
};
