import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { createHotel } from "../Actions/hotel";
import HotelCreateForm from "../components/Forms/HotelCreateForm";
// Will destruct the options menu for finalizing the selection menu for the seller

const NewHotel = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://source.unsplash.com/user/erondu?text=PREVIEW"
  );

  const [location, setLocation] = useState("");
  // destructuring variables from state
  const { title, description, image, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("description", description);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    console.log([...hotelData]);

    let res = await createHotel(token, hotelData);
    console.log("Your Hotel Entry Has Been Added", res);
    toast.success(
      "New Event, Venue or Lodging Has Been Added To Your Inventory"
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid  p-5 text-center">
        <h2>Add Events, Venues And Lodging</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
            {/* {JSON.stringify(location)} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
